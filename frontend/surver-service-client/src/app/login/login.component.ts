import { Component, OnInit } from '@angular/core';
import {RestApiService} from "../restapi.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:string;
  pass:string;
  message:any;
  constructor(private service:RestApiService, private router:Router) { }

  ngOnInit(): void {
  }
  doLogin()
  {
   let response = this.service.login(this.user,this.pass);
   response.subscribe(data =>{
     this.message = data;
     this.router.navigate([{outlets:{primary:'home'}}])
   })
  }
}