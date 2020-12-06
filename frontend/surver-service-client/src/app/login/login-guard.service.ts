import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {AuthenticationService} from "../auth/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate{

  constructor(public auth: AuthenticationService, private router:Router) { }

  canActivate():boolean{
    const token = this.auth.getToken();
    if(token==null)
    {
      return true;
    }
    else if (!this.auth.isAuthenticated()){
      return true;
    }
    else{
      this.router.navigate(['/home']);
      return false;
    }
  }
}
