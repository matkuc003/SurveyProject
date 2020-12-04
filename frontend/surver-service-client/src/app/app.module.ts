import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RestApiService } from './restapi.service';
import { HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JwtHelperService, JwtModule, JwtModuleOptions} from "@auth0/angular-jwt";
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin/admin.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { SurveysComponent } from './surveys/surveys.component';
import { HomeComponent } from './home/home.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import {MaterialModule} from "./material.module";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import { EditSurveyComponent } from './edit-survey/edit-survey.component';
import { SurveyViewComponent } from './survey-view/survey-view.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ClipboardModule} from "@angular/cdk/clipboard";
import { ResultsSurveyComponent } from './results-survey/results-survey.component';
import { ChartsModule } from 'ng2-charts';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

const JWT_Module_Options: JwtModuleOptions = {
  config: {
    tokenGetter: tokenGetter,
  }
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    EditUserComponent,
    SurveysComponent,
    HomeComponent,
    CreateSurveyComponent,
    EditSurveyComponent,
    SurveyViewComponent,
    ResultsSurveyComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        JwtModule.forRoot(JWT_Module_Options),
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MaterialModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatGridListModule,
        MatCardModule,
        MatRadioModule,
        MatTooltipModule,
        ClipboardModule,
        ChartsModule
    ],
  providers: [JwtHelperService, RestApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
