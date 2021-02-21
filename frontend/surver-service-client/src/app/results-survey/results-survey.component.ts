import {AfterContentInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {SurveyRestApiService} from "../rest-apis/survey-rest-api.service";
import {Survey} from "../model/Survey";
import {Question} from "../model/Question";
import * as Highcharts from 'highcharts';
import HC_more from "highcharts/highcharts-more";
import HC_exporting from "highcharts/modules/exporting";
import {chart, Options} from "highcharts";
import {AnswerRaportByQuestion} from "../model/AnswerRaportByQuestion";
import {DownloadCSVService} from "../download-csv/download-csv.service";

HC_more(Highcharts);
HC_exporting(Highcharts);
let intervalIDs = new Map<number, any>();

@Component({
  selector: 'app-results-survey',
  templateUrl: './results-survey.component.html',
  styleUrls: ['./results-survey.component.css']
})
export class ResultsSurveyComponent implements OnInit, AfterContentInit {
  Highcharts: typeof Highcharts = Highcharts; // required
  surveyID: String;
  surveyToResults: Survey;
  surveyQuestions: Options[];
  resultsForCSV = new Array<AnswerRaportByQuestion>();
  pageChangeEvent: any;

  constructor(private router: Router, private downloadCSVService: DownloadCSVService, private route: ActivatedRoute, private surveyRestApiService: SurveyRestApiService) {
  }

  ngOnInit(): void {
    Highcharts.charts.forEach((next, index) => {
      Highcharts.charts.splice(index);
    })
    this.route.paramMap.subscribe(params => {
        this.surveyID = params.get("id");
      }
    )
    this.surveyRestApiService.getSurveyByID(this.surveyID).subscribe(message => {
      this.surveyToResults = message;
      this.createFormToEdit();
    });
  }

  ngAfterContentInit(): void {
    this.pageChangeEvent = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        intervalIDs.forEach((value) => {
          if (value) {
            clearInterval(value);
          }
        })
        this.unsubscribePageChangeEvent();
      }
    })
  };
  unsubscribePageChangeEvent() {
    this.pageChangeEvent.unsubscribe();
  }
  createFormToEdit() {
    this.surveyQuestions = new Array<Options>();
    this.surveyToResults.questions.forEach((next, index) => {
      this.onAddQuestion(next, index);
    });
  }

  onAddQuestion(question: Question, index: number) {
    let chartLabels = [];
    let data = [];
    question.options.forEach(option => {
      chartLabels.push(option.optionText)
    });

    var myFunction = (dataSeries,question_id) => {
      let dataTMP = [];
      this.surveyRestApiService.getRaportAnswersByQuestion(question_id).subscribe(next => {
        next.forEach(raport => {
          if (raport.option_text != null) {
            dataTMP.push({name:raport.option_text,y:raport.answer_count})
          }
          else if (raport.rating_value != null) {
            dataTMP.push({name:raport.rating_value,y:raport.answer_count})
          }
        })
      }, error => {
      }, () => {
        dataSeries.setData(dataTMP);
      })
    };

    this.surveyRestApiService.getRaportAnswersByQuestion(question.question_id).subscribe(message => {
        message.forEach(raport => {
          if (raport.option_text != null)
            data.push({name:raport.option_text,y:raport.answer_count})
          else if (raport.rating_value != null) {
            data.push({name:raport.rating_value,y:raport.answer_count})
          }
        })
      },
      error => console.log("error"),
      () => {
        if (question.type != 'Text') {
          if(question.type=='Rating')
          {
            chartLabels.push(1,2,3,4,5);
          }
          this.surveyQuestions.push({
              chart: {
                renderTo: "chart" + question.question_id,
                height: 200,
                events: {
                  load: function () {
                    console.log('load');
                    intervalIDs.set(question.question_id, setInterval(() => {
                      myFunction(this.series[0],question.question_id);
                    }, 5000));
                  }
                }
              },
              title: {
                text: question.text
              },
              credits: {
                enabled: false
              },
              yAxis:{
                title: {text:'liczba osób'}
               },
              xAxis: {
                type: 'category'
              },
              series: [
                {
                  type: "pie",
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
              },
              tooltip: {
                formatter: function () {
                  var sliceIndex = this.point.index;
                  var sliceName = this.series.chart.axes[0].categories[sliceIndex];
                  return 'Liczba wybranych odpowiedzi to <b>' + this.y + '</b>';
                }
              },
            }
          )
        }
      })
    this.surveyRestApiService.getAnswerRaportForCSV(question).subscribe(message => {
      message.forEach(next => this.resultsForCSV.push(next));
    })
  }

  exportToCSV() {
    this.downloadCSVService.downloadFile(this.resultsForCSV, this.surveyToResults.title + "_results");
  }

  onTypeChange(question, newType) {
    Highcharts.charts.forEach((next, index) => {
      if (next === undefined) {
        console.log('undef');
      } else if (next.options.chart.renderTo == question.chart.renderTo) {
        Highcharts.charts[index].series.forEach(next => {
          next.update({type: newType}, true);
        })
      }
    });
  }
}
