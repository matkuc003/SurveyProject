import { Component, OnInit } from '@angular/core';
import {SurveyRestApiService} from "../survey-rest-api.service";
import {Survey} from "../model/Survey";

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css']
})
export class SurveysComponent implements OnInit {
  surveysArray:Array<Survey>;
  tiles=[]
  constructor(private surveyRestApiService:SurveyRestApiService) { }

  ngOnInit(): void {
    this.getSurveys();
  }

  getSurveys(){
    this.surveyRestApiService.getSurveysByUsername().subscribe(message=> {
        this.surveysArray = message;
        this.tiles = this.surveysArray;
      }
    );
  }
  onDelete(survey:Survey){
    this.surveysArray.splice(this.surveysArray.indexOf(survey),1);
    this.surveyRestApiService.deleteSurvey(survey).subscribe(message=>console.log(message));
  }
}
