import {Injectable} from "@angular/core";
import {Address} from "../models/address.model";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  generateId(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}
