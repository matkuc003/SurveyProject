import {Question} from "./Question";
import {UserModel} from "./UserModel";

export interface Survey {
  title: string,
  questions: Array<Question>,
  isAnonymous: boolean,
  user: UserModel

}
