import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SurveyRestApiService} from "../survey-rest-api.service";
import {Survey} from "../model/Survey";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Question} from "../model/Question";
import {Option} from "../model/Option";

@Component({
  selector: 'app-results-survey',
  templateUrl: './results-survey.component.html',
  styleUrls: ['./results-survey.component.css']
})
export class ResultsSurveyComponent implements OnInit {

  surveyID: String;
  surveyToResults: Survey;
  surveyQuestions: Object[];

  constructor(private route: ActivatedRoute, private surveyRestApiService: SurveyRestApiService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        this.surveyID = params.get("id");
      }
    )
    this.surveyRestApiService.getSurveyByID(this.surveyID).subscribe(message => {
      this.surveyToResults = message;
      this.createFormToEdit();
    });
  }

  public chartType: string = 'bar';

  public chartDatasets: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset'},
  ];

  public chartLabels: Array<any> = [];

   random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
  }
  public chartColors: Array<any> = [
    {
      backgroundColor: this.random_rgba(),
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 1,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true,
    scales:{yAxes: [{
      ticks: {
        stepSize:1,
        beginAtZero: true
      }
    }]
    }
  };

  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }

  createFormToEdit() {
    this.surveyQuestions = new Array<Question>();
    let isAnonymous = this.surveyToResults.isAnonymous;
    this.surveyToResults.questions.forEach((next, index) => {
      this.onAddQuestion(next, index);
    });
  }

  onAddQuestion(question: Question, index: number) {
    let optionArray = new FormArray([]);
    let showRemarksBox = question.hasRemarks;
    let chartDataSets = [];
    let chartLabels = [];
    let data = [];
    question.options.forEach(option => {
      chartLabels.push(option.optionText)
    });
    this.surveyRestApiService.getRaportAnswersByQuestion(question).subscribe(message => {
        console.log(message)
        message.forEach(raport => {
          if(raport.option_id!=null)
              data.push(raport.answer_count)
            //chartDataSets.push({data: [raport.answer_count], label: "t"+raport.option_id});
          else if(raport.rating_value!=null){
            data.push(raport.answer_count)
           // chartDataSets.push({data: [raport.answer_count], label: raport.rating_value});
          }
        })
      },
      error => console.log("error"),
      () => {
        if (question.type != 'Text' && question.type!='Rating') {
          chartDataSets.push({data: data, label: 'Liczba odpowiedzi'});
          this.surveyQuestions.push({
            'chartType': this.chartType,
            'chartLabels': chartLabels,
            'chartDatasets': chartDataSets
          });
        }
        else if(question.type=='Rating'){
          chartDataSets.push({data: data, label: 'Liczba odpowiedzi'});
          this.surveyQuestions.push({
          'chartType': this.chartType,
            'chartLabels': [1,2,3,4,5],
            'chartDatasets': chartDataSets
          });
        }
      })

  }
}
