import {Material} from "../models/material.model";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ApiUrls} from "../shared/api-url";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {UtilsService} from "./utils-service";
import {Order} from "../models/order.model";
import {MyEvent, MyEventResponse} from "../models/myEvent.model";

@Injectable({ providedIn: 'root' })

export class EventService {

  constructor(private http: HttpClient,
              private utils: UtilsService) {
  }

  addEvent(event: MyEvent): Observable<any> {
    const addEventUrl = environment.apiHost + ApiUrls.event.create;
    const token = this.utils.getToken();

    // Convertir startDate et endDate en format ISO complet
    const startDateISO = new Date(event.startDate!).toISOString();
    const endDateISO = new Date(event.endDate!).toISOString();

    const body = JSON.stringify({
      name: event.name,
      location: event.location,
      status: 'PLANNED',
      description: event.description,
      startDate: startDateISO,  // Date convertie en ISO
      endDate: endDateISO,      // Date convertie en ISO
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(addEventUrl, body, { headers: headers });
  }



  getEvents(): Observable<MyEventResponse[]> {
    const token = this.utils.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const getAllEventsUrl = environment.apiHost + ApiUrls.event.getAll;
    return this.http.get<any>(getAllEventsUrl, {headers: headers});
  }

  orderMaterial(order: Order): Observable<any> {
    const orderUrl = environment.apiHost + ApiUrls.command.create;
    const body = JSON.stringify({
      id: this.utils.generateId(12),
      nomMembreClient: order.clientName,
      nomMembreActif: order.activeName,
      date: order.date,
      prixTotal: order.totalPrice,
      listeIdMateriaux: order.materialIds,
      idMembreClient: order.clientId,
      idMembreActif: order.activeId,
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(orderUrl, body, {headers: headers});
  }
  getMaterialsData(): Material[] {
    return [
      {
        id: '1',
        serial: '12345',
        brand: 'Apple',
        model: 'Mac M1',
        type: 'Laptop',
        price: 2300,
        groupId: '1'
      },
      {
        id: '2',
        serial: '16478',
        brand: 'Lenovo',
        model: 'Yoga P9',
        type: 'Laptop',
        price: 1300,
        groupId: '1'
      },
      {
        id: '3',
        serial: '56476',
        brand: 'Intel',
        model: 'i7 13e gen',
        type: 'Processor',
        price: 450,
        groupId: '1'
      },
      {
        id: '4',
        serial: '675789987',
        brand: 'Dell',
        model: 'Power +',
        type: 'Laptop',
        price: 850,
        groupId: '1'
      },
      {
        id: '5',
        serial: '17865',
        brand: 'Asus',
        model: 'Zenbook',
        type: 'Laptop',
        price: 2000,
        groupId: '1'
      },
      {
        id: '6',
        serial: '34537',
        brand: 'Samsung',
        model: 'Book air',
        type: 'Laptop',
        price: 1800,
        groupId: '1'
      },
      {
        id: '7',
        serial: '986875',
        brand: 'Apple',
        model: 'Mac M2',
        type: 'Laptop',
        price: 2500,
        groupId: '1'
      },
      {
        id: '8',
        serial: '564567',
        brand: 'AMD',
        model: 'Rizen 5',
        type: 'Processor',
        price: 250,
        groupId: '1'
      },
      {
        id: '9',
        serial: '9986106',
        brand: 'Electronix',
        model: 'Elec',
        type: 'Cable haute tension',
        price: 43,
        groupId: '2'
      },
    ];
  }
  getMaterialsDataPromise(): Promise<Material[]> {
    return Promise.resolve(this.getMaterialsData().slice(0, 200));
  }
};
