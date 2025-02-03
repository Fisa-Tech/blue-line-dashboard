import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UtilsService} from "./utils-service";
import {MyEvent, MyEventResponse} from "../models/myEvent.model";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ApiUrls} from "../shared/api-url";
import {Challenge, ChallengeResponse} from "../models/challenge.model";

@Injectable({ providedIn: 'root' })

export class ChallengeService {

  constructor(private http: HttpClient,
              private utils: UtilsService) {
  }

  addChallenge(challenge: {
    endDate: string;
    name: string;
    timeGoal: null;
    description: string;
    distanceGoal: null;
    type: string;
    startDate: string
  }): Observable<any> {
    const addChallengeUrl = environment.apiHost + ApiUrls.challenge.create;
    const token = this.utils.getToken();

    // Convertir startDate et endDate en format ISO complet
    const startDateISO = new Date(challenge.startDate!).toISOString();
    const endDateISO = new Date(challenge.endDate!).toISOString();

    const body = JSON.stringify({
      name: challenge.name,
      type: challenge.type?.toUpperCase(),
      status: 'A_RELEVER',
      description: challenge.description,
      startDate: startDateISO,
      endDate: endDateISO,
      distanceGoal: challenge.distanceGoal,
      timeGoal: challenge.timeGoal,
      streakPeriod: 'DAY',
      streakNbOfParticipations: 0,
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(addChallengeUrl, body, {headers: headers});
  }


  getChallenges(): Observable<ChallengeResponse[]> {
    const token = this.utils.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const getAllEventsUrl = environment.apiHost + ApiUrls.challenge.getAll;
    return this.http.get<any>(getAllEventsUrl, {headers: headers});
  }
}
