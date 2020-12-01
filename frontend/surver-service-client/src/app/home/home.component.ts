import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../auth/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username:string;
  constructor(private router:Router,private authenticationService: AuthenticationService) {
    this.username = localStorage.getItem("username");
  }
  logout(){
    this.authenticationService.logOut();
    this.router.navigate(["/login"])
  }
  ngOnInit(): void {
  }

}
