import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ApiUrls} from "../shared/api-url";
import {ActiveUsersResponse} from "../models/activeUserResponse.model";
import {AuthService} from "./auth.service";
import {UtilsService} from "./utils-service";

@Injectable({ providedIn: 'root' })

export class StatsService {

  constructor(private http: HttpClient,
              private utils: UtilsService) {
  }

  computeStartDate(period: string) {
    const mapping: { [key: string]: string } = {
      "jour": "d",
      "jours": "d",
      "mois": "M",
      "an": "y",
      "ans": "y",
      "année": "y",
      "années": "y"
    };

    const parts = period.split(" ");
    if (parts.length !== 2) return null;

    const number = parseInt(parts[0], 10);
    const unit = parts[1].toLowerCase();

    // Vérifiez si le mapping contient l'unité
    if (isNaN(number) || !(unit in mapping)) return null;

    const today = new Date();

    // Modifications en fonction de l'unité
    if (mapping[unit] === "d") {
      today.setDate(today.getDate() - number);
    } else if (mapping[unit] === "M") {
      today.setMonth(today.getMonth() - number);
    } else if (mapping[unit] === "y") {
      today.setFullYear(today.getFullYear() - number);
    }

    // Retourner la date formatée
    return today.toISOString().split("T")[0];
  }

  getActiveUsers(
    startDate: string | null,
    endDate: string,
    period: string,
    userStatus: string | null,
    gender: string | null,
    userAction: string | null
  ): Observable<ActiveUsersResponse> {
    const getActiveUsersUrl = environment.apiHost + ApiUrls.stats.getActiveUsers;

    const token = this.utils.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    let params = new HttpParams()
      .set('endDate', endDate)

    if (startDate !== null) {
      params = params.set('startDate', startDate);
    }

    params = params.set('period', period);

    if (userStatus !== null) {
      params = params.set('userStatus', userStatus);
    }

    if (gender !== null) {
      params = params.set('gender', gender);
    }

    if (userAction !== null) {
      params = params.set('userAction', userAction);
    }

    return this.http.get<ActiveUsersResponse>(getActiveUsersUrl, { headers, params });
  }

}
