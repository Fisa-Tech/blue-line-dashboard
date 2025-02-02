import {Member} from "./member.model";

export interface Group {
  id?: string;
  number?: string;
  name?: string;
  city?: string;
  cp?: number;
  memberIds?: string[];
  materialIds?: string[];
  [key: string]: any;
}
