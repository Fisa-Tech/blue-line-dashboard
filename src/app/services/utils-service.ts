import {Injectable} from "@angular/core";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root',
})
export class UtilsService {

  constructor(private datePipe: DatePipe) {
  }

  generateId(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  convertDateFormat(inputDate: number[]): string {
    if (!Array.isArray(inputDate) || inputDate.length < 3) {
      return '';
    }

    // Reconstruction de la date (mois - 1 car en JS les mois commencent à 0)
    const dateObj = new Date(
      inputDate[0], // Année
      inputDate[1] - 1, // Mois (0-based)
      inputDate[2], // Jour
      inputDate[3] || 0, // Heure (facultatif)
      inputDate[4] || 0, // Minute (facultatif)
      inputDate[5] || 0 // Seconde (facultatif)
    );

    // Formatage avec DatePipe
    const formattedDate = this.datePipe.transform(dateObj, 'yyyy-MM-dd');
    return formattedDate || '';
  }


  getToken(): string | null {
    return sessionStorage.getItem('userToken');
  }
}
