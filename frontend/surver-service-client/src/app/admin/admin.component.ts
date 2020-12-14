import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../auth/authentication.service";
import {MatTableDataSource} from "@angular/material/table";
import {RestApiService} from "../rest-apis/restapi.service";
import {first} from 'rxjs/operators';
import {UserModel} from "../model/UserModel";
import {Role} from "../model/Role";
import * as uuid from 'uuid';

export interface PeriodicUserElement {
  username: string;
  role: any;
}

export interface PeriodicRoleElement {
  id: number;
  role: string;
  p_admin_panel: boolean;
  p_create_surveys: boolean;
  p_delete_surveys: boolean;
  p_edit_surveys: boolean;
  p_results_surveys: boolean;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  users = null;
  roles = null;
  usersTable: boolean;
  rolesTable: boolean;
  USERS_ELEMENT_DATA: PeriodicUserElement[] = [];
  ROLES_ELEMENT_DATA: PeriodicRoleElement[] = [];
  usersDataSource = new MatTableDataSource(this.USERS_ELEMENT_DATA);
  rolesDataSource = new MatTableDataSource(this.ROLES_ELEMENT_DATA);

  constructor(private router: Router, private authenticationService: AuthenticationService, private restApiService: RestApiService) {
  }

  ngOnInit(): void {
    this.usersTable = true;
    this.rolesTable = false;
    this.restApiService.getUsers().pipe(first()).subscribe(
      message => {
        this.users = message;
        this.fillUsersArray();
      }
    );
    this.restApiService.getRoles().pipe(first()).subscribe(
      message => {
        console.log(message);
        this.roles = message;
        this.fillRolesArray();
      }
    );
  }

  fillUsersArray() {
    this.users.forEach(
      value => {
        this.USERS_ELEMENT_DATA.push({username: value.username, role: value.roles.role})
      }
    )
    this.usersDataSource = new MatTableDataSource(this.USERS_ELEMENT_DATA);
  }

  fillRolesArray() {
    this.roles.forEach(
      value => {
        console.log(value.role);
        this.ROLES_ELEMENT_DATA.push({
          id: value.id,
          role: value.role,
          p_admin_panel: value.p_admin_panel,
          p_create_surveys: value.p_create_surveys,
          p_delete_surveys: value.p_delete_surveys,
          p_edit_surveys: value.p_edit_surveys,
          p_results_surveys: value.p_results_surveys
        })
      }
    )
    this.usersDataSource = new MatTableDataSource(this.USERS_ELEMENT_DATA);
  }

  deleteOnClick(row) {
    let response = this.restApiService.deleteUser(row.username);
    response.subscribe(res => console.log(res));
    this.USERS_ELEMENT_DATA.splice(this.USERS_ELEMENT_DATA.indexOf(row), 1);
    this.usersDataSource = new MatTableDataSource(this.USERS_ELEMENT_DATA);

  }

  addUser() {
    let newUser = new UserModel();
    newUser.username = 'newUser' + uuid.v4();
    newUser.password = 'password';
    newUser.email = 'example2@ex.pl';

    let body = JSON.stringify(newUser);
    this.restApiService.register(body).subscribe(response => {
      this.router.navigate(['home/admin/edit/', newUser.username]);
    });
  }

  roleButtonClick() {
    this.usersTable = false;
    this.rolesTable = true;
  }

  userButtonClick() {
    this.usersTable = true;
    this.rolesTable = false;
  }

  deleteRoleOnClick(row) {
    let response = this.restApiService.deleteRole(row.role);
    response.subscribe(res => console.log(res));
    this.ROLES_ELEMENT_DATA.splice(this.ROLES_ELEMENT_DATA.indexOf(row), 1);
    this.rolesDataSource = new MatTableDataSource(this.ROLES_ELEMENT_DATA);
  }

  saveRoleOnClick(row) {
    let role = new Role();
    role.id = row.id;
    role.role = row.role;
    role.p_admin_panel = row.p_admin_panel;
    role.p_create_surveys = row.p_create_surveys;
    role.p_delete_surveys = row.p_delete_surveys;
    role.p_edit_surveys = row.p_edit_surveys;
    role.p_results_surveys = row.p_results_surveys;

    this.restApiService.updateRole(role).subscribe(response => console.log(response));
  }

  addRoleOnClick() {
    let role = new Role();
    role.id = 0;
    role.role = "newRole" + uuid.v4();
    role.p_admin_panel = false;
    role.p_create_surveys = true;
    role.p_delete_surveys = true;
    role.p_edit_surveys = true;
    role.p_results_surveys = true;

    this.restApiService.createRole(role).subscribe(response => {
        console.log(response)
        this.ROLES_ELEMENT_DATA.push({
          id: response.id,
          role: response.role,
          p_admin_panel: response.p_admin_panel,
          p_create_surveys: response.p_create_surveys,
          p_delete_surveys: response.p_delete_surveys,
          p_edit_surveys: response.p_edit_surveys,
          p_results_surveys: response.p_results_surveys
        })
        this.rolesDataSource = new MatTableDataSource(this.ROLES_ELEMENT_DATA);
      }
    );

  }
}
