export interface User {
  id?: number;
  firstname?: string;
  lastname?: string;
  friendId?: string;
  email?: string;
  gender?: string;
  avatar?: string;
  status?: string;
  [key: string]: any;
}
