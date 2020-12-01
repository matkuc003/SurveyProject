import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AuthGuardService} from "./auth/auth-guard.service";
import {RegisterComponent} from "./register/register.component";
import {AdminComponent} from "./admin/admin.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {SurveysComponent} from "./surveys/surveys.component";
import {LoginGuardService} from "./login/login-guard.service";
import {HomeComponent} from "./home/home.component";
import {CreateSurveyComponent} from "./create-survey/create-survey.component";
import {EditSurveyComponent} from "./edit-survey/edit-survey.component";
import {SurveyViewComponent} from "./survey-view/survey-view.component";

const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full"},
  {path: "login", component: LoginComponent, canActivate: [LoginGuardService]},
  {path: "register", component: RegisterComponent},
  {
    path: "home", component: HomeComponent, canActivate: [AuthGuardService], children: [
      {path: "surveys/create-survey", component: CreateSurveyComponent, canActivate: [AuthGuardService]},
      {path: "surveys/edit-survey/:id", component: EditSurveyComponent, canActivate: [AuthGuardService]},
      {path: "surveys/survey-view/:id", component: SurveyViewComponent, canActivate: [AuthGuardService]},
      {path: "admin", component: AdminComponent, canActivate: [AuthGuardService]},
      {path: "admin/edit/:username", component: EditUserComponent, canActivate: [AuthGuardService]},
      {path: "surveys", component: SurveysComponent, canActivate: [AuthGuardService]}]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
