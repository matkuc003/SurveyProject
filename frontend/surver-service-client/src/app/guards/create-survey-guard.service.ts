import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class CreateSurveyGuardService {

  constructor(public jwtHelper: JwtHelperService) { }

  canActivate(): boolean {
    let token = localStorage.getItem("jwt");
    let url = window.location.href;
    let jwtArray = this.jwtHelper.decodeToken(token);
    return jwtArray['p_create_surveys'];
  }
}
