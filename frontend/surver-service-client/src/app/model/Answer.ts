import {UserModel} from "./UserModel";
import {Question} from "./Question";
import {Option} from "./Option";

export interface Answer {
  username:string;
  questionID:number;
  optionsID:Array<number>;
  textAreaValue:String;
  ratingValue:number;
}
