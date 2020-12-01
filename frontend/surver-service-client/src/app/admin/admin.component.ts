import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../auth/authentication.service";
import {MatTableDataSource} from "@angular/material/table";
import {RestApiService} from "../restapi.service";
import { first } from 'rxjs/operators';
import {UserModel} from "../model/UserModel";
import {Role} from "../model/Role";
export interface PeriodicElement {
  username: string;
  role: any;
}
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  users = null;
  tmpRoles:any;
  ELEMENT_DATA: PeriodicElement[] =[];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  constructor(private router:Router,private authenticationService: AuthenticationService, private restApiService:RestApiService) {}

  ngOnInit(): void {
    this.restApiService.getUsers().pipe(first()).subscribe(
      message => {
        this.users = message;
        this.fillArray();
      }
    );
  }
  fillArray(){
    this.users.forEach(
      value=>{
        Object.keys(value.roles).map((key)=>this.tmpRoles=value.roles[key]);
        this.ELEMENT_DATA.push({username:value.username, role:this.tmpRoles.role})
      }
    )
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }
  deleteOnClick(row){
    let response = this.restApiService.deleteUser(row.username);
    response.subscribe(res=>console.log(res));
    this.ELEMENT_DATA.splice(this.ELEMENT_DATA.indexOf(row),1);
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  }
}
