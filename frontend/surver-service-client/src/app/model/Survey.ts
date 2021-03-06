import {Question} from "./Question";
import {UserModel} from "./UserModel";

export interface Survey {
  title: string,
  description: string,
  questions: Array<Question>,
  isAnonymous: boolean,
  lastModificationDate: Date,
  user: UserModel
}
