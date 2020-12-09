import {Role} from "./Role";

export class UserModel {
  username:string;
  password:string;
  email:string;
  phoneNumber:string;
  year: number;
  roles:Role;
  active:boolean;
}
