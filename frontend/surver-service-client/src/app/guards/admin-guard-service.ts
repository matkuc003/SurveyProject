import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(private jwtHelper: JwtHelperService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let token = localStorage.getItem("jwt");
    let jwtArray = this.jwtHelper.decodeToken(token);
    if(route.url.length>1) {
      if (route.url[1].path === 'create-survey') {
        return jwtArray['p_create_surveys'];
      } else if (route.url[1].path === 'edit-survey') {
        return jwtArray['p_edit_surveys'];
      } else if (route.url[1].path === 'results') {
        return jwtArray['p_results_surveys'];
      }
    }
    else if(route.url[0].path === 'admin'){
      return jwtArray['p_admin_panel'];
    }
    else{
      return false;
    }

  }
}
