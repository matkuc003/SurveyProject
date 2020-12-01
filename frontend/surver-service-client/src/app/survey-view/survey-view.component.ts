import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Question} from "../model/Question";
import {Option} from "../model/Option";
import {ActivatedRoute} from "@angular/router";
import {SurveyRestApiService} from "../survey-rest-api.service";
import {Survey} from "../model/Survey";
import {MatRadioChange} from "@angular/material/radio";
import {Answer} from "../model/Answer";

@Component({
  selector: 'app-survey-view',
  templateUrl: './survey-view.component.html',
  styleUrls: ['./survey-view.component.css']
})
export class SurveyViewComponent implements OnInit {
  private rating: number = 3;
  private starCount: number = 5;
  public ratingArr = [];
  answerArray = new Map<number, Answer>();
  multiOptionsID = new Map<number, number[]>();
  textareaValue: string;
  selectedOption = [];
  surveyToView: Survey;
  surveyForm: FormGroup;
  surveyIDToView: number;

  constructor(private route: ActivatedRoute, private surveyRestApiService: SurveyRestApiService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        this.surveyIDToView = Number(params.get("id"));
      }
    )
    this.surveyRestApiService.getSurveyByID(this.surveyIDToView).subscribe(message => {
      this.surveyToView = message;
      this.createFormToEdit()
      console.log(this.surveyForm)
    });
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  createFormToEdit() {
    let surveyQuestions = new FormArray([]);
    let surveyTitle = this.surveyToView.title;
    let isAnonymous = this.surveyToView.isAnonymous;
    this.surveyForm = new FormGroup({
      'surveyTitle': new FormControl({value: surveyTitle, disabled: true}, [Validators.required]),
      'surveyQuestions': surveyQuestions,
      'IsAnonymous': new FormControl({value: isAnonymous, disabled: true}, [Validators.required])
    });
    this.surveyToView.questions.forEach((next, index) => {
      this.onAddQuestion(next, index);
    });
  }

  onAddQuestion(question: Question, index: number) {
    let optionArray = new FormArray([]);
    let showRemarksBox = new FormControl(question.hasRemarks);
    question.options.forEach(option => {
      this.addOption(option, optionArray);
    })
    const surveyQuestionItem = new FormGroup({
      'question_id': new FormControl({value: question.question_id, disabled: true}, Validators.required),
      'questionTitle': new FormControl({value: question.text, disabled: true}, Validators.required),
      'questionType': new FormControl(question.type, Validators.required),
      'questionGroup': new FormGroup({'options': optionArray, 'showRemarksBox': showRemarksBox})
    });
    (<FormArray>this.surveyForm.controls.surveyQuestions).push(surveyQuestionItem);
    this.selectedOption[index] = question.type;

  }

  addOption(option: Option, questionOptions: FormArray) {
    const optionGroup = new FormGroup({
      'option_id': new FormControl({value: option.option_id, disabled: true}),
      'optionText': new FormControl({value: option.optionText, disabled: true}, Validators.required),
    });
    (<FormArray>questionOptions).push(optionGroup);
  }

  onSend() {
    console.log(this.answerArray);
    this.multiOptionsID.forEach((options,question)=>{
      this.createAnswer(null,null,null,question,options);
    })
    this.answerArray.forEach(
      (answer) => {
        this.surveyRestApiService.saveAnswer(answer).subscribe(response => {
            this.answerArray.clear();
            this.multiOptionsID.clear();
            console.log(response)
          }
        );
      }
    )
  }

  createAnswer(user, ratingValue, textAreaValue, questionID, optionsID) {
    let username:string;
    if(this.surveyToView.isAnonymous)
    {
      username = null;
    }
    else{
      username = localStorage.getItem("username");
    }
    let answer: Answer = {
      username: username,
      ratingValue: ratingValue,
      textAreaValue: textAreaValue,
      questionID: Number(questionID),
      optionsID: optionsID,
    }
    if (this.answerArray.has(questionID)) {
      this.answerArray.delete(questionID);
      this.answerArray.set(questionID, answer);
    } else {
      this.answerArray.set(questionID, answer);
    }
  }

  radioChange(data, question) {
    console.log(data.value.option_id, question.controls.question_id.value);
    let questionID = question.controls.question_id.value;
    let optionID = [data.value.option_id];
    this.createAnswer(null, null, null, questionID, optionID);
  }

  checkboxChange(event, data, question) {
    let questionID = question.controls.question_id.value;
    let optionsID = data.value.option_id;
    if (event.checked) {
      if (this.multiOptionsID.has(questionID)) {
        this.multiOptionsID.get(questionID).push(optionsID);
      } else {
        let optionsArray = [optionsID];
        this.multiOptionsID.set(questionID, optionsArray);
      }
    } else {
      let optionsArray = this.multiOptionsID.get(questionID);
      optionsArray.splice(optionsArray.indexOf(optionsID));
    }
  }

  onClickStar(rating: number, question) {
    this.rating = rating;
    let questionID = question.controls.question_id.value;
    this.createAnswer(null, rating, null, questionID, null);
    return false;
  }

  onLeaveTextArea(event, question) {
    this.textareaValue = event.target.value;
    let questionID = question.controls.question_id.value;
    this.createAnswer(null, null, event.target.value, questionID, null);
  }

  showIconStar(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}
