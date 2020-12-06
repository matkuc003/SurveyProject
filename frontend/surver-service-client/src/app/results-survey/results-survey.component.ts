import {AfterContentInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {SurveyRestApiService} from "../survey-rest-api.service";
import {Survey} from "../model/Survey";
import {Question} from "../model/Question";
import * as Highcharts from 'highcharts';
import HC_more from "highcharts/highcharts-more";
import HC_exporting from "highcharts/modules/exporting";
import {Options} from "highcharts";
import {AnswerRaportByQuestion} from "../model/AnswerRaportByQuestion";
import {DownloadCSVService} from "../download-csv.service";
import {Subscription} from "rxjs";
HC_more(Highcharts);
HC_exporting(Highcharts);

@Component({
  selector: 'app-results-survey',
  templateUrl: './results-survey.component.html',
  styleUrls: ['./results-survey.component.css']
})
export class ResultsSurveyComponent implements OnInit,AfterContentInit  {
  Highcharts: typeof Highcharts = Highcharts; // required
  surveyID: String;
  surveyToResults: Survey;
  surveyQuestions: Options[];
  resultsForCSV = new Array<AnswerRaportByQuestion>();
  intervalID: any;
  intervalSubscribe: Subscription;
  pageChangeEvent: any;
  constructor(private router:Router,private downloadCSVService: DownloadCSVService, private route: ActivatedRoute, private surveyRestApiService: SurveyRestApiService) {
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
 unsubscribePageChangeEvent() {
    //TODO DESTROY CHARTS ERROR Error: Uncaught (in promise): TypeError: Cannot read property 'forExport' of undefined
    this.pageChangeEvent.unsubscribe();
  }
  ngAfterContentInit():void{
    this.dataChangeInterval();
    this.pageChangeEvent = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.intervalID) {
          this.intervalSubscribe.unsubscribe();
          console.log("page")
          this.unsubscribePageChangeEvent();
          clearInterval(this.intervalID);
        }
      }
    });
  }

  createFormToEdit() {
    this.surveyQuestions = new Array<Options>();
    this.surveyToResults.questions.forEach((next, index) => {
      this.onAddQuestion(next, index);
    });
  }

  onAddQuestion(question: Question, index: number) {
    let chartDataSets = [];
    let chartLabels = [];
    let data = [];
    question.options.forEach(option => {
      chartLabels.push(option.optionText)
    });
    this.surveyRestApiService.getRaportAnswersByQuestion(question.question_id).subscribe(message => {
        console.log(message)
        message.forEach(raport => {
          if (raport.option_id != null)
            data.push(raport.answer_count)
          else if (raport.rating_value != null) {
            data.push(raport.answer_count)
          }
        })
      },
      error => console.log("error"),
      () => {
        if (question.type != 'Text' && question.type != 'Rating') {
          this.surveyQuestions.push({
              chart: {
                renderTo: "chart" + question.question_id,
                height: 200,
              },
              title: {
                text: question.text
              },
              credits: {
                enabled: false
              },
              xAxis: {
                categories: chartLabels
              },
              series: [
                {
                  type: "bar",
                  data: data,
                  showInLegend: false,
                  colorByPoint: true,
                }
              ],
              exporting: {
                enabled: true,
                chartOptions: {
                  chart: {
                    borderWidth: 2,
                    borderColor: "red"
                  }
                }
              }
            }
          )
        } else if (question.type == 'Rating') {
          this.surveyQuestions.push({
              chart: {
                renderTo: "chart" + question.question_id,
                height: 200
              },
              title: {
                text: question.text
              },
              credits: {
                enabled: false
              },
              xAxis: {
                categories: ['1', '2', '3', '4', '5']
              },
              series: [
                {
                  type: "line",
                  data: data,
                  showInLegend: false,
                  colorByPoint: true
                }
              ],
              exporting: {
                enabled: true,
                chartOptions: {
                  chart: {
                    borderWidth: 2,
                    borderColor: "red"
                  }
                }
              }
            }
          )
        }
      })
    this.surveyRestApiService.getAnswerRaportForCSV(question).subscribe(message => {
      message.forEach(next => this.resultsForCSV.push(next));
      console.log(this.resultsForCSV);
    })
  }

  exportToCSV() {
    this.downloadCSVService.downloadFile(this.resultsForCSV, this.surveyToResults.title + "_results");
  }

  onTypeChange(question, newType) {
    question.series[0].type = newType;
    Highcharts.chart(question).redraw();
  }

  dataChangeInterval() {
    this.intervalID = setInterval(() => {
      this.surveyQuestions.forEach(option => {
          let question = option.chart.renderTo.toString().match(/\d+/)[0];
          console.log(question);
          let data = [];
          this.intervalSubscribe = this.surveyRestApiService.getRaportAnswersByQuestion(Number(question)).subscribe(next=>{
            next.forEach(raport => {
              if (raport.option_id != null)
                data.push(raport.answer_count)
              else if (raport.rating_value != null) {
                data.push(raport.answer_count)
              }
            })
          },error=>{},()=>{
            Highcharts.chart(option).series[0].setData(data,true);
          })
        }
      )
    }, 5000);
  }
}
