import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../auth/authentication.service";
import {RestApiService} from "../rest-apis/restapi.service";
import { ActivatedRoute } from '@angular/router';
import {UserModel} from "../model/UserModel";
import {Role} from "../model/Role";
import {MatDialog} from "@angular/material/dialog";
import {ChangePaswordDialogComponent} from "../change-pasword-dialog/change-pasword-dialog.component";
import {JwtHelperService} from "@auth0/angular-jwt";
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  usernameToEdit:string;
  oldpassword: string;
  newpassword: string;
  permissionForChangeRole: boolean;
  confirmnewpassword: string;
  userToEdit:UserModel;
  allRoles:Role[];
  constructor(private route:ActivatedRoute,
              private jwtHelper: JwtHelperService,
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
    this.restApiService.getRoles().subscribe(response=>{
      this.allRoles=response;
    })
    this.getPermissions();
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
  getPermissions(){
    let token = localStorage.getItem("jwt");
    let jwtArray = this.jwtHelper.decodeToken(token);
    this.permissionForChangeRole = jwtArray['p_admin_panel'];
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

