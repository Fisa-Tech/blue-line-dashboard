import {Material} from "../models/material.model";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ApiUrls} from "../shared/api-url";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {UtilsService} from "./utils-service";
import {Order} from "../models/order.model";

@Injectable({ providedIn: 'root' })

export class MaterialService {

  constructor(private http: HttpClient,
              private utils: UtilsService) {
  }

  addMaterial(material: Material) : Observable<any> {
    const addMaterialUrl = environment.apiHost + ApiUrls.material.create;
    const body = JSON.stringify({
      id: this.utils.generateId(12),
      numeroDeSerie: material.serial,
      marque: material.brand,
      modele: material.model,
      type: material.type,
      prix: material.price,
      idGroupe: material.groupId,
      idCommande: '',
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(addMaterialUrl, body, {headers: headers});
  }

  getMaterials(groupId: string): Observable<any> {
    const getAllGroupsUrl = environment.apiHost + ApiUrls.material.getAll;
    let params = new HttpParams().set('groupId', groupId);
    return this.http.get<any>(getAllGroupsUrl, {params: params});
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
