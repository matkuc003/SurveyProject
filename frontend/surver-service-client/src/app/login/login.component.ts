import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RestApiService} from "../rest-apis/restapi.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:string;
  pass:string;
  message:any;
  constructor(private activatedRouter:ActivatedRoute, private service:RestApiService, private router:Router) { }

  ngOnInit(): void {
  }
  doLogin()
  {
   let response = this.service.login(this.user,this.pass);
   let uuid = this.activatedRouter.snapshot.params.id;
   response.subscribe(data =>{
     this.message = data;
     if(uuid === undefined) {
       this.router.navigate([{outlets: {primary: 'home'}}])
     }
     else{
       this.router.navigate([{outlets: {primary: 'surveys/survey-view/false/'+uuid}}])
     }
   })
  }
}
