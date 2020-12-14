import { Component, OnInit } from '@angular/core';
import {SurveyRestApiService} from "../rest-apis/survey-rest-api.service";
import {Survey} from "../model/Survey";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css']
})
export class SurveysComponent implements OnInit {
  surveysArray: Array<Survey>;
  tiles = []
  hostname;

  constructor(private snackBar: MatSnackBar, private surveyRestApiService: SurveyRestApiService) {
    this.hostname = "http://localhost:4200/surveys";
  }

  ngOnInit(): void {
    this.getSurveys();
  }

  getSurveys() {
    this.surveyRestApiService.getSurveysByUsername().subscribe(message => {
        this.surveysArray = message;
        this.tiles = this.surveysArray;
      }
    );
  }

  onDelete(survey: Survey) {
    this.surveysArray.splice(this.surveysArray.indexOf(survey), 1);
    this.surveyRestApiService.deleteSurvey(survey).subscribe(message => console.log(message));
  }

  onShare() {
    this.snackBar.open("Link do ankiety został skopiowany do schowka.", "Ok", {
      duration: 2000,
    });
  }
}
