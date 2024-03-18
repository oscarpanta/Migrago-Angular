import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  currentDateUtils(): Date {
      return moment().utcOffset("-05:00").toDate();
    }

  LastDateString(date: Date): string {
      const fechaMoment = moment(date).utcOffset("-05:00");
      const fechaUltimoDiaMes = fechaMoment
        .clone()
        .endOf('month');
      return fechaUltimoDiaMes.format("DD/MM/YYYY");
    }

  formatDatetimeToString(date: Date): string {
      const fechaMoment = moment(date).utcOffset("-05:00");
      const dateResult = fechaMoment.format("DD/MM/YYYY HH:mm:ss");
      return dateResult;
    }

  formatDatetimeToStringGlobal(date: Date): string {
      const fechaMoment = moment(date).utcOffset("-05:00");
      const dateResult = fechaMoment.format("YYYY-MM-DD HH:mm:ss");
      return dateResult;
    }
  formatDatetimeToStringGlobal2(date: string): string {
      const fechaNat = new Date(date);
      const fechaMoment = moment(fechaNat);
      const dateResult = fechaMoment.format("YYYY-MM-DD HH:mm:ss");
      return dateResult;
    }
  formatDateToString(date: Date): string {
      const fechaMoment = moment(date);
      const dateResult = fechaMoment.format("DD/MM/YYYY");
      return dateResult;
    }

  formatDateToStringGlobal(date: Date): string {
      const fechaMoment = moment(date);
      const dateResult = fechaMoment.format("YYYY-MM-DD");
      return dateResult;
    }
}
