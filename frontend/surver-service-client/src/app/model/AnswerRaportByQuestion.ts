import {UserModel} from "./UserModel";
import {Question} from "./Question";
import {Option} from "./Option";

export interface AnswerRaportByQuestion {
  type:string;
  username:string;
  text:string;
  text_area_value:string;
  option_text:string;
  ratingValue:number;
  answer_id:number;
}
