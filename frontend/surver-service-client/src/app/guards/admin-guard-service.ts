import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(public jwtHelper: JwtHelperService) { }

  canActivate(): boolean {
    let token = localStorage.getItem("jwt");
    let url = window.location.href;
    let jwtArray = this.jwtHelper.decodeToken(token);
    return jwtArray['p_admin_panel'];
  }
}
