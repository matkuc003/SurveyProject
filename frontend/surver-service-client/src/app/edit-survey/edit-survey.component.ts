import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Survey} from "../model/Survey";
import {Form, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {SurveyRestApiService} from "../survey-rest-api.service";
import {ActivatedRoute} from "@angular/router";
import {Question} from "../model/Question";
import {Option} from "../model/Option";

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.css']
})
export class EditSurveyComponent implements OnInit {
  surveyToEdit: Survey;
  surveyToEditFormGroup: FormGroup;
  surveyIDToEdit: number;

  constructor(private route: ActivatedRoute, private surveyRestApiService: SurveyRestApiService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        this.surveyIDToEdit = Number(params.get("id"));
        this.surveyRestApiService.getSurveyByID(this.surveyIDToEdit).subscribe(message => {
          this.surveyToEdit = message;
          console.log(message)
          this.createFormToEdit()
        });
      }
    )
  }

  createFormToEdit() {
    let surveyQuestions = new FormArray([]);
    let surveyTitle = this.surveyToEdit.title;
    let isAnonymous = this.surveyToEdit.isAnonymous;
      this.surveyToEditFormGroup = new FormGroup({
        'surveyTitle': new FormControl(surveyTitle, [Validators.required]),
        'surveyQuestions': surveyQuestions,
        'IsAnonymous': new FormControl(isAnonymous, [Validators.required])
      });
      this.surveyToEdit.questions.forEach(next=>
      {
        this.onAddQuestion(next);
      })
      console.log("wyslane")
  }
  onAddQuestion(question:Question) {
    let optionArray = new FormArray([]);
    let showRemarksBox = new FormControl(question.hasRemarks);
    question.options.forEach(option=>{
      this.addOption(option,optionArray);
    })
    const surveyQuestionItem = new FormGroup({
      'question_id': new FormControl({value:question.question_id}, Validators.required),
      'questionTitle': new FormControl(question.text, Validators.required),
      'questionType': new FormControl(question.type, Validators.required),
      'questionGroup': new FormGroup({'options': optionArray,'showRemarksBox': showRemarksBox})
    });
    console.log("push");
    (<FormArray>this.surveyToEditFormGroup.controls.surveyQuestions).push(surveyQuestionItem);

  }
  addOption(option:Option,questionOptions:FormArray) {
    const optionGroup = new FormGroup({
      'option_id': new FormControl({value:option.option_id}, Validators.required),
      'optionText': new FormControl(option.optionText, Validators.required),
    });
    (<FormArray>questionOptions).push(optionGroup);
  }
}
