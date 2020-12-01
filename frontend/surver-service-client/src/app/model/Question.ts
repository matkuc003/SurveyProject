import {Option} from "./Option";

export interface Question {
     question_id:number,
     type: string,
     text: string,
     options: Array<Option>,
     required: boolean,
     remarks: string,
     hasRemarks: boolean,
}
