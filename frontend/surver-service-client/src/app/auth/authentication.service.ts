import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient,public jwtHelper: JwtHelperService) {
  }

  public authenticate(username: string, password: string) {
    return this.httpClient.post<any>("http://localhost:8080/api/authenticate", {username, password})
      .pipe(
        map(userData => {
          localStorage.setItem("username", username);
          localStorage.setItem("jwt", userData.jwt);
          return userData;
        })
      )
  }
  public getToken(): string {
    return localStorage.getItem('jwt');
  }
  public isAuthenticated(): boolean {
    const token = this.getToken();
    return !this.jwtHelper.isTokenExpired(token);
  }
  logOut() {
    localStorage.removeItem("username");
    localStorage.removeItem("jwt");
  }
}
