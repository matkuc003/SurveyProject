import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../auth/authentication.service";
import {RestApiService} from "../restapi.service";
import { ActivatedRoute } from '@angular/router';
import {UserModel} from "../model/UserModel";
import {Role} from "../model/Role";
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  usernameToEdit:string;
  userToEdit:UserModel;
  constructor(private route:ActivatedRoute,
              private router:Router,
              private authenticationService: AuthenticationService,
              private restApiService:RestApiService) {
    this.userToEdit=new UserModel();
    this.userToEdit.roles=new Role();
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>
      {
      this.usernameToEdit = params.get("username");
      this.setUser();
      }
    )
  }
  setUser(): void{
    this.restApiService.getUserByUsername(this.usernameToEdit).subscribe(
      message => {
        this.userToEdit = message;
      }
    );
  }
  onSaveClick(){
    let response = this.restApiService.updateUser(this.usernameToEdit,this.userToEdit);
    response.subscribe(next=>this.router.navigate(["/admin"]));
  }
  onCancelClick()
  {
    this.router.navigate(["/admin"]);
  }
}
