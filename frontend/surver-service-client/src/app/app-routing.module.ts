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
import {ResultsSurveyComponent} from "./results-survey/results-survey.component";
import {SurveyViewGuardService} from "./survey-view-guard/survey-view-guard.service";
import {CreateSurveyGuardService} from "./guards/create-survey-guard.service";
import {EditSurveyGuardService} from "./guards/edit-survey-guard.service";
import {ResultsSurveyGuardService} from "./guards/results-survey-guard-service";
import {AdminGuardService} from "./guards/admin-guard-service";

const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full"},
  {path: "login", component: LoginComponent, canActivate: [LoginGuardService]},
  {path: "register", component: RegisterComponent},
  {
    path: "home", component: HomeComponent, canActivate: [AuthGuardService], children: [
      {path: "surveys/create-survey", component: CreateSurveyComponent, canActivate:[CreateSurveyGuardService]},
      {path: "surveys/edit-survey/:id", component: EditSurveyComponent, canActivate:[EditSurveyGuardService]},
      {
        path: "surveys/survey-view/:anon/:id",
        component: SurveyViewComponent
      },
      {path: "surveys/results/:id", component: ResultsSurveyComponent,canActivate:[ResultsSurveyGuardService]},
      {path: "admin", component: AdminComponent,canActivate:[AdminGuardService]},
      {path: "admin/edit/:username", component: EditUserComponent,canActivate:[AdminGuardService]},
      {path: "surveys", component: SurveysComponent}
    ]
  },
  {
    path: "surveys/survey-view/:anon/:id",
    component: SurveyViewComponent,
    canActivate: [SurveyViewGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
