import {UserModel} from "./UserModel";
import {Question} from "./Question";
import {Option} from "./Option";

export interface AnswerForChart {
  answer_id:number;
  user:UserModel;
  question:Question;
  options:Array<Option>;
  textAreaValue:string;
  ratingValue:number;
}
