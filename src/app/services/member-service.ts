import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {ApiUrls} from "../shared/api-url";
import {Member} from "../models/member.model";
import {AddressService} from "./address-service";
import {UtilsService} from "./utils-service";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient,
              private addressService: AddressService,
              private utils: UtilsService) { }

  getMembers(groupId: string): Observable<any> {
    const getAllMembersUrl = environment.apiHost + ApiUrls.members.getAll;
    let params = new HttpParams().set('groupId', groupId);
    return this.http.get<any>(getAllMembersUrl, {params: params});
  }

  login(email: string, password: string): Observable<any> {
    const loginUrl = environment.apiHost + ApiUrls.members.login;
    const body = JSON.stringify({email: email, password: password});
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(loginUrl, body, {headers: headers});
  }

  signIn(member: Member): Observable<any> {
    const signInUrl = environment.apiHost + ApiUrls.members.inscription;
    const body = JSON.stringify({
      id: this.utils.generateId(12),
      nom: member.name,
      prenom: member.firstname,
      adresse: this.addressService.addressToString(member.address),
      typeMembre: member.memberType,
      idGroupe: member.groupId,
      idCommande: '',
      email: member.email,
      password: member.password
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(signInUrl, body, {headers: headers});
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
