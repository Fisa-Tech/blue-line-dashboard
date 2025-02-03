import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {ApiUrls} from "../shared/api-url";
import {Member} from "../models/member.model";
import {UtilsService} from "./utils-service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private utils: UtilsService) { }

  /*getMembers(groupId: string): Observable<any> {
    const getAllMembersUrl = environment.apiHost + ApiUrls.users.getAll;
    let params = new HttpParams().set('groupId', groupId);
    return this.
    http.get<any>(getAllMembersUrl, {params: params});
  }*/

  getUsers(): Observable<any> {
    const token = this.utils.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const getAllUsersUrl = environment.apiHost + ApiUrls.users.getAll;
    return this.http.get<any>(getAllUsersUrl, {headers: headers});
  }

  login(email: string, password: string): Observable<any> {
    const loginUrl = environment.apiHost + ApiUrls.users.login;
    const body = JSON.stringify({email: email, password: password});
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(loginUrl, body, {headers: headers, responseType: 'text'});
  }

  parseMember(rawMember: any): Member {
    const parts = rawMember.adresse?.split(',');
    if(parts && parts.length == 2) {
      const numberAndStreet = parts[0].trim().split(' ');
      if(numberAndStreet && numberAndStreet.length > 1) {
        const numberStr = numberAndStreet[0];
        const number = parseInt(numberStr);
        const street = parts[0].replace(numberStr, '').trim();
        const cpAndCity = parts[1].trim().split(' ');
        if(cpAndCity && cpAndCity.length == 2){
          const cp = parseInt(cpAndCity[0]);
          const city = cpAndCity[1];
          return {
            name: rawMember.nom,
            firstname: rawMember.prenom,
            address: {
              number: number,
              street: street,
              city: city,
              cp: cp
            },
            email: rawMember.email,
            memberType: rawMember.typeMembre,
            id: rawMember.id
          }
        }
      }
    }
    return {address:{}};
  }


}
