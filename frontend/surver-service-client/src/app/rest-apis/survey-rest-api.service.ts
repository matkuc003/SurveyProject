import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Survey} from "../model/Survey";
import {RestApiService} from "./restapi.service";
import {Option} from "../model/Option";
import {Question} from "../model/Question";
import {Answer} from "../model/Answer";
import {AnswerForChart} from "../model/AnswerForChart";
import {AnswerCountRaport} from "../model/AnswerCountRaport";
import {AnswerRaportByQuestion} from "../model/AnswerRaportByQuestion";

@Injectable({
  providedIn: 'root'
})
export class SurveyRestApiService {

  constructor(private http: HttpClient) { }

  public saveSurvey(survey:Survey){
    let username = localStorage.getItem("username");
    const headers = new HttpHeaders({'Content-Type':'application/json', Authorization:"Bearer "+localStorage.getItem("jwt")});
    return this.http.post<any>("http://localhost:8080/api/survey/createSurvey/"+username,survey,{headers});
  }
  public updateSurvey(previousSurveyID:number, survey: Survey){
    const headers = new HttpHeaders({'Content-Type':'application/json', Authorization:"Bearer "+localStorage.getItem("jwt")});
    return this.http.put("http://localhost:8080/api/survey/updateSurvey/"+previousSurveyID,survey,{headers});
  }
  public saveQuestion(data:Question){
    let body = JSON.stringify(data);
    const headers = new HttpHeaders({'Content-Type':'application/json', Authorization:"Bearer "+localStorage.getItem("jwt")});
    return this.http.post<any>("http://localhost:8080/api/questions/createQuestion",body,{headers});
  }
  public saveOption(data:Option){
    let body = JSON.stringify(data);
    const headers = new HttpHeaders({'Content-Type':'application/json', Authorization:"Bearer "+localStorage.getItem("jwt")});
    return this.http.post<any>("http://localhost:8080/api/options/createOption",body,{headers});
  }
  public saveAnswer(answer:Answer){
    //const headers = new HttpHeaders({'Content-Type':'application/json', Authorization:"Bearer "+localStorage.getItem("jwt")});
    return this.http.post<any>("http://localhost:8080/api/answers/createAnswer",answer);
  }
  public getOptionByID(optionID: number)
  {
    const headers = new HttpHeaders({'Content-Type':'application/json', Authorization:"Bearer "+localStorage.getItem("jwt")});
    return this.http.get<Option>("http://localhost:8080/api/options/getOption/"+optionID,{headers})
  }
  public getQuestionByID(questionID: number)
  {
    const headers = new HttpHeaders({'Content-Type':'application/json', Authorization:"Bearer "+localStorage.getItem("jwt")});
    return this.http.get<Question>("http://localhost:8080/api/questions/getQuestion/"+questionID,{headers})
  }
  public getSurveysByUsername()
  {
    let username = localStorage.getItem("username");
    const headers = new HttpHeaders({'Content-Type':'application/json', Authorization:"Bearer "+localStorage.getItem("jwt")});
    return this.http.get<Array<Survey>>("http://localhost:8080/api/survey/getAllSurveys/"+username,{headers})
  }
  public getSurveyByID(surveyID:String)
  {
    //const headers = new HttpHeaders({'Content-Type':'application/json', Authorization:"Bearer "+localStorage.getItem("jwt")});
    return this.http.get<Survey>("http://localhost:8080/api/survey/getSurvey/"+surveyID)
  }
  public getSurveyByPart(part:String)
  {
    const headers = new HttpHeaders({'Content-Type':'application/json', Authorization:"Bearer "+localStorage.getItem("jwt")});
    return this.http.get<Array<Survey>>("http://localhost:8080/api/survey/getSurveysByPart/"+part,{headers})
  }
  public getAnswerByQuestion(question:Question)
  {
    const headers = new HttpHeaders({'Content-Type':'application/json', Authorization:"Bearer "+localStorage.getItem("jwt")});
    return this.http.get<Array<AnswerForChart>>("http://localhost:8080/api/answers/getAnswersByQuestion/"+question.question_id,{headers})
  }
  public getRaportAnswersByQuestion(question:number)
  {
    const headers = new HttpHeaders({'Content-Type':'application/json', Authorization:"Bearer "+localStorage.getItem("jwt")});
    return this.http.get<Array<AnswerCountRaport>>("http://localhost:8080/api/answers/getRaport/"+question,{headers})
  }
  public getAnswerRaportForCSV(question:Question)
  {
    const headers = new HttpHeaders({'Content-Type':'application/json', Authorization:"Bearer "+localStorage.getItem("jwt")});
    return this.http.get<Array<AnswerRaportByQuestion>>("http://localhost:8080/api/answers/getRaportByQuestion/"+question.question_id,{headers})
  }
  public deleteSurvey(survey:Survey){
    const headers = new HttpHeaders({'Content-Type':'application/json', Authorization:"Bearer "+localStorage.getItem("jwt")});
    const options = {
      headers:headers,
      body:survey
    };
    return this.http.delete<any>("http://localhost:8080/api/survey/deleteSurvey/",options)
  }
}
