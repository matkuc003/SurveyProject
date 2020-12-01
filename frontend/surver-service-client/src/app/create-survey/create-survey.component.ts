import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Survey} from "../model/Survey";
import {SurveyRestApiService} from "../survey-rest-api.service";
import {RestApiService} from "../restapi.service";
import {UserModel} from "../model/UserModel";
import {Option} from "../model/Option";
import {ActivatedRoute} from "@angular/router";
import {Question} from "../model/Question";

export interface QuestionType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent implements OnInit, OnChanges {

  @Input() surveyFormToEdit: FormGroup;
  surveyForm: FormGroup;
  selectedOption = [];
  user: UserModel;
  editBool: boolean;
  questionsTypes: QuestionType[] = [
    {value: 'Single choice', viewValue: 'Wybór pojedynczy'},
    {value: 'Multi choice', viewValue: 'Wybór wielu'},
    {value: 'Text', viewValue: 'Pole tekstowe'},
    {value: 'Rating', viewValue: 'Ocena od 1 do 5'}
  ];


  constructor(private route: ActivatedRoute, public surveyRestApiService: SurveyRestApiService, private userRestApi: RestApiService) {
  }

  ngOnInit(): void {
    this.userRestApi.getUserByUsername(localStorage.getItem("username")).subscribe(next => this.user = next);
    let surveyTitle = '';
    let surveyQuestions = new FormArray([]);
    this.surveyForm = new FormGroup({
      'surveyTitle': new FormControl(surveyTitle, [Validators.required]),
      'surveyQuestions': surveyQuestions,
      'IsAnonymous': new FormControl(false, [Validators.required])
    });
    this.onAddQuestion();
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes[propName].previousValue != this.surveyFormToEdit) {
        let formData = this.surveyFormToEdit.value;
        this.surveyForm = this.surveyFormToEdit;
        let surveyQuestions = formData.surveyQuestions;
        surveyQuestions.forEach((question, index, array) => {
          this.selectedOption[index] = question.questionType;
        });
        this.editBool = true;
      } else {
        this.editBool = false;
      }
    }

  }

  onAddQuestion() {
    const surveyQuestionItem = new FormGroup({
      'questionTitle': new FormControl('', Validators.required),
      'questionType': new FormControl('', Validators.required),
      'questionGroup': new FormGroup({})
    });
    (<FormArray>this.surveyForm.controls.surveyQuestions).push(surveyQuestionItem);
  }

  onDeleteButton(questionIndex) {
    this.surveyForm.controls.surveyQuestions['controls'][questionIndex].controls.questionGroup = new FormGroup({});
    this.surveyForm.controls.surveyQuestions['controls'][questionIndex].controls.questionType = new FormControl({});

    (<FormArray>this.surveyForm.controls.surveyQuestions).removeAt(questionIndex);
  }

  addOptionControls(questionType, index) {
    let options = new FormArray([]);
    let showRemarksBox = new FormControl(false);

      (this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup).addControl('options', options);
      (this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup).addControl('showRemarksBox', showRemarksBox);

      this.clearFormArray((<FormArray>this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup.controls.options));

      this.addOption(index);
      this.addOption(index);

  }

  onSelectQuestionType(questionType, index) {
    if (questionType === 'Single choice' || questionType === 'Multi choice') {
      this.addOptionControls(questionType, index)
    }
  }

  addOption(index) {
    const optionGroup = new FormGroup({
      'optionText': new FormControl('', Validators.required),
    });
    (<FormArray>this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup.controls.options).push(optionGroup);
  }

  private clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  removeOption(questionIndex, itemIndex) {
    (<FormArray>this.surveyForm.controls.surveyQuestions['controls'][questionIndex].controls.questionGroup.controls.options).removeAt(itemIndex);
  }

  onSave() {
      let formData = this.surveyForm.value;
      let surveyQuestions = formData.surveyQuestions;
      let survey: Survey = {
        title: formData.surveyTitle,
        isAnonymous: formData.IsAnonymous,
        questions: [],
        user: this.user
      }
      surveyQuestions.forEach((question, index, array) => {
        let questionID;
        if(question.question_id===undefined){
          questionID = 0;
        }
        else{
          questionID = question.question_id.value;
        }
        let questionItem: Question ={
          "question_id":questionID,
          "type": question.questionType,
          "text": question.questionTitle,
          "options": [],
          "required": false,
          "remarks": "",
          "hasRemarks": question.hasRemarks
        }
        if (question.questionGroup.hasOwnProperty('showRemarksBox')) {
          questionItem.hasRemarks = question.questionGroup.showRemarksBox;
        }

        if (question.questionGroup.hasOwnProperty('options')) {
          question.questionGroup.options.forEach(option => {
            let optionID;
            if(option.option_id===undefined){
              optionID = 0;
              console.log("here");
            }
            else{
              optionID = option.option_id.value;
            }
            let optionItem: Option = {
              "option_id":optionID,
              "optionText": option.optionText,
              "optionColor": "",
              "hasRemarks": false

            }
            questionItem.options.push(optionItem)
          });
        }
        survey.questions.push(questionItem);
      });
      if(!this.editBool) {
        let response = this.surveyRestApiService.saveSurvey(survey);
        response.subscribe(next => console.log(next));
      }
      else{
        let idEditedSurvey;
        console.log(survey);
        this.route.paramMap.subscribe(params => {
          idEditedSurvey = Number(params.get("id"));
          this.surveyRestApiService.updateSurvey(idEditedSurvey,survey).subscribe(message=>console.log(message));
        })

      }
  }
}
