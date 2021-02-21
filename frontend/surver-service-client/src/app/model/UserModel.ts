import {Role} from "./Role";

export class UserModel {
  username:string;
  password:string;
  email:string;
  phoneNumber:string;
  roles:Role;
  active:boolean;
}
