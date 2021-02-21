import { Component, OnInit } from '@angular/core';
import {SurveyRestApiService} from "../rest-apis/survey-rest-api.service";
import {Survey} from "../model/Survey";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {JwtHelperService} from "@auth0/angular-jwt";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css']
})
export class SurveysComponent implements OnInit {
  surveysArray: Array<Survey>;
  tiles = []
  hostname;
  length:number;
  pageSlice;
  titleSurveyForSearch = "";
  constructor(private jwtHelper: JwtHelperService, private snackBar: MatSnackBar, private surveyRestApiService: SurveyRestApiService) {
    this.hostname = "http://localhost:4200/surveys";
  }

  ngOnInit(): void {
    this.getSurveys();
  }

  getSurveys() {
    this.surveyRestApiService.getSurveysByUsername().subscribe(message => {
        this.surveysArray = message;
        this.tiles = this.surveysArray.sort((a: Survey, b: Survey) => {
          return new Date(b.lastModificationDate).getTime() - new Date(a.lastModificationDate).getTime();
        });
        this.pageSlice = this.tiles.slice(0,7);
      }
    );
  }

  onDelete(survey: Survey) {
    let token = localStorage.getItem("jwt");
    let jwtArray = this.jwtHelper.decodeToken(token);
    if(jwtArray['p_delete_surveys'])
    {
      this.surveysArray.splice(this.surveysArray.indexOf(survey), 1);
      this.pageSlice = this.tiles.slice(0,7);
      this.surveyRestApiService.deleteSurvey(survey).subscribe(message => console.log(message));
    }
  }

  onShare() {
    this.snackBar.open("Link do ankiety został skopiowany do schowka.", "Ok", {
      duration: 2000,
    });
  }
  public onPageChange(event: PageEvent){
  const startIndex = event.pageIndex * event.pageSize;
  let endIndex = startIndex + event.pageSize;
  if(endIndex > this.tiles.length)
  {
    endIndex = this.tiles.length;
  }
  this.pageSlice = this.tiles.slice(startIndex,endIndex);
  }
  onSearchClick(){
    if(this.titleSurveyForSearch === "")
    {
      this.pageSlice = this.tiles.slice(0,7);
    }
    else {
      this.surveyRestApiService.getSurveyByPart(this.titleSurveyForSearch).subscribe(
        response => {
          this.pageSlice = response.sort((a: Survey, b: Survey) => {
            return new Date(b.lastModificationDate).getTime() - new Date(a.lastModificationDate).getTime();});
        },
        error => {
          this.pageSlice = [];
        }
      );
    }
  }
  onClearClick(){
    this.titleSurveyForSearch='';
    this.pageSlice = this.tiles.slice(0,7);
  }
}
