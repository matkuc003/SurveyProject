import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "../auth/authentication.service";
import {UserModel} from "../model/UserModel";
import {Observable} from "rxjs";
import {Role} from "../model/Role";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }
  public login(username:string, password:string)
  {
    return this.authenticationService.authenticate(username,password);;
  }
  public register(body: string)
  {
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post<any>("http://localhost:8080/api/user/create", body,{headers})
  }
  public updateUser(username:string,data: UserModel)
  {
    const headers = new HttpHeaders({'Content-Type':'application/json', Authorization:"Bearer "+localStorage.getItem("jwt")});
    return this.http.put<any>("http://localhost:8080/api/user/change/"+username, data,{headers})
  }
  public changePassword(username:string,oldPassword:string,newPassword:string)
  {
    const headers = new HttpHeaders({'Content-Type':'application/json', Authorization:"Bearer "+localStorage.getItem("jwt")});
    return this.http.put<any>("http://localhost:8080/api/user/changePassword/", {username,oldPassword,newPassword},{headers})
  }
  public deleteUser(username: string)
  {
    const headers = new HttpHeaders({'Content-Type':'application/json', Authorization:"Bearer "+localStorage.getItem("jwt")});
    return this.http.delete<any>("http://localhost:8080/api/user/delete/"+username,{headers})
  }
  public getUsers(): Observable<UserModel[]>
  {
    const headers = new HttpHeaders({'Content-Type':'application/json',Authorization:"Bearer "+localStorage.getItem("jwt")});
    return this.http.get<UserModel[]>("http://localhost:8080/api/user/getUsers",{headers:headers});
  }

  public getUserByUsername(username:string): Observable<UserModel>
  {
    const headers = new HttpHeaders({'Content-Type':'application/json',Authorization:"Bearer "+localStorage.getItem("jwt")});
    return this.http.get<UserModel>("http://localhost:8080/api/user/"+username,{headers:headers});
  }

  public getRoleByRoleName(role_name:string): Observable<Role>
  {
    const headers = new HttpHeaders({'Content-Type':'application/json',Authorization:"Bearer "+localStorage.getItem("jwt")});
    return this.http.get<Role>("http://localhost:8080/api/role/getRole/"+role_name,{headers:headers});
  }
  public getRoles(): Observable<Role[]>
  {
    const headers = new HttpHeaders({'Content-Type':'application/json',Authorization:"Bearer "+localStorage.getItem("jwt")});
    return this.http.get<Role[]>("http://localhost:8080/api/role/getRoles",{headers:headers});
  }
  public updateRole(role:Role)
  {
    const headers = new HttpHeaders({'Content-Type':'application/json',Authorization:"Bearer "+localStorage.getItem("jwt")});
    return this.http.put<any>("http://localhost:8080/api/role/updateRole",role,{headers:headers});
  }
  public deleteRole(role_name:string)
  {
    const headers = new HttpHeaders({'Content-Type':'application/json',Authorization:"Bearer "+localStorage.getItem("jwt")});
    return this.http.delete<any>("http://localhost:8080/api/role/deleteRole/"+role_name,{headers:headers});
  }
  public createRole(role:Role)
  {
    const headers = new HttpHeaders({'Content-Type':'application/json',Authorization:"Bearer "+localStorage.getItem("jwt")});
    return this.http.post<any>("http://localhost:8080/api/role/createRole/",role,{headers:headers});
  }
}
