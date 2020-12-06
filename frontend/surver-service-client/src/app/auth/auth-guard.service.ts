import { Injectable } from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
    surveyIDToView :string;
  constructor(public auth: AuthenticationService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
