import {Group} from "../models/group.model";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {ApiUrls} from "../shared/api-url";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Member} from "../models/member.model";
import {Material} from "../models/material.model";
import {UtilsService} from "./utils-service";
@Injectable({ providedIn: 'root' })
export class GroupService {

  constructor(private http: HttpClient,
              private utils: UtilsService) {
  }

  addGroup(group: Group) : Observable<any> {
    const addGroupUrl = environment.apiHost + ApiUrls.groups.create;
    const body = JSON.stringify({
      id: this.utils.generateId(12),
      numero: 'GXX',
      nomGroupe: group.name,
      ville: group.city,
      codePostal: group.cp,
      listeIdMembres: [],
      listeIdMateriaux: []
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(addGroupUrl, body, {headers: headers});
  }

  getGroup(groupId: string) {
    const getGroupUrl = environment.apiHost + ApiUrls.groups.getOne(groupId);
    return this.http.get<any>(getGroupUrl);
  }

  getGroups(): Observable<any> {
    const getAllGroupsUrl = environment.apiHost + ApiUrls.groups.getAll;
    return this.http.get<any>(getAllGroupsUrl);
  }

  parseGroup(rawGroup: any) : Group {
    return {
      id: rawGroup.id,
      number: rawGroup.numero,
      name: rawGroup.nomGroupe,
      city: rawGroup.ville,
      cp: rawGroup.codePostal
    };
  }

  getGroupsData(): Group[] {
    return [
      {
        id: '1',
        number: 'G1',
        name: 'Informatique',
        city: 'Valenciennes',
        cp: 59300,
        memberIds: ['1000', '1001', '1002', '1003']
      },
      {
        id: '2',
        number: 'G2',
        name: 'Electrique',
        city: 'Paris',
        cp: 75000,
        memberIds: ['1004', '1005']
      },
      {
        id: '3',
        number: 'G3',
        name: 'Vroumvroum',
        city: 'Valenciennes',
        cp: 59300,
        memberIds: ['1006']
      },
      {
        id: '4',
        number: 'G4',
        name: 'ouaisouaisouais',
        city: 'Caen',
        cp: 14000,
        memberIds: ['1008', '1007']
      },
      {
        id: '5',
        number: 'G5',
        name: 'groupe 5',
        city: 'Lille',
        cp: 59000,
        memberIds: ['1009']
      },
      {
        id: '6',
        number: 'G6',
        name: 'Electronique 2',
        city: 'Valenciennes',
        cp: 59300,
        memberIds: ['1010']
      },
    ];
  }
  getGroupsDataPromise(): Promise<Group[]> {
    return Promise.resolve(this.getGroupsData().slice(0, 200));
  }
};
