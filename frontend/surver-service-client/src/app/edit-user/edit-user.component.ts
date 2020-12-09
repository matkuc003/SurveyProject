import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../auth/authentication.service";
import {RestApiService} from "../restapi.service";
import { ActivatedRoute } from '@angular/router';
import {UserModel} from "../model/UserModel";
import {Role} from "../model/Role";
import {MatDialog} from "@angular/material/dialog";
import {ChangePaswordDialogComponent} from "../change-pasword-dialog/change-pasword-dialog.component";
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  usernameToEdit:string;
  oldpassword: string;
  newpassword: string;
  confirmnewpassword: string;
  userToEdit:UserModel;
  constructor(private route:ActivatedRoute,
              public dialog: MatDialog,
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
    response.subscribe(next=>this.router.navigate(["/home/admin"]));
  }
  onCancelClick()
  {
    this.router.navigate(["/home/admin"]);
  }
  openDialog(){
    const dialogRef = this.dialog.open(ChangePaswordDialogComponent, {
      width: '250px',
      data: {oldpassword: this.oldpassword, newpassword: this.newpassword, confirmnewpassword: this.confirmnewpassword}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result===undefined){
        return;
      }
      else{
        this.restApiService.changePassword(this.userToEdit.username,result.oldpassword,result.newpassword).subscribe(next=>console.log(next));
      }
    });
  }
}

