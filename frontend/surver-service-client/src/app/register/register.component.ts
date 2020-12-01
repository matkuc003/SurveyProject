import { Component, OnInit } from '@angular/core';
import {RestApiService} from "../restapi.service";
import {Router} from "@angular/router";
import {UserModel} from "../model/UserModel";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:string;
  pass:string;
  passConf:string;
  email:string;

  constructor(private service:RestApiService, private router:Router) {}

  ngOnInit(): void {
  }
  doRegister()
  {
    let data = {
      "username":this.user,
    "password":this.pass,
    "email":this.email
    }
    let body = JSON.stringify(data);

    let response = this.service.register(body);
    response.subscribe(data =>{
      this.router.navigate(["/login"])
    })
  }
}
