import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class ResultsSurveyGuardService {

  constructor(public jwtHelper: JwtHelperService) { }

  canActivate(): boolean {
    let token = localStorage.getItem("jwt");
    let url = window.location.href;
    let jwtArray = this.jwtHelper.decodeToken(token);
    return jwtArray['p_results_surveys'];
  }
}
