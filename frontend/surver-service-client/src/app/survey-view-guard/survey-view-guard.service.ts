import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {SurveyRestApiService} from "../survey-rest-api.service";
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
    console.log(this.isAnonymous);
    if(this.isAnonymous=='false') {
      if (!this.auth.isAuthenticated()) {
        console.log('nieanon');
        this.router.navigate([{outlets:{primary: 'login'}}]);
        return false;
      }
      return true;
    }else if (this.isAnonymous=='true') {
      console.log('anon');
      return true;
    }
  }

}
