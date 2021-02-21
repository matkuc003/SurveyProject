import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {SurveyRestApiService} from "../rest-apis/survey-rest-api.service";
import {AuthenticationService} from "../auth/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class SurveyViewGuardService {
  isAnonymous: string = 'false';

  constructor(public auth: AuthenticationService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    this.isAnonymous = route.paramMap.get("anon");
    let uuid = route.paramMap.get("id");
    console.log(this.isAnonymous);
    if(this.isAnonymous=='false') {
      if (!this.auth.isAuthenticated()) {
        this.router.navigate([{outlets:{primary: 'login/'+uuid}}]);
        return false;
      }
      return true;
    }else if (this.isAnonymous=='true') {
      return true;
    }
  }

}
