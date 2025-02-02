import {Address} from "./address.model";

export interface Member {
  id?: string;
  name?: string;
  firstname?: string;
  address?: Address;
  city?: string;
  email?: string;
  password?: string;
  groupId?: string;
  memberType?: string;
  [key: string]: any;
}
