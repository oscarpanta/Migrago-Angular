import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(private http: HttpClient) { }

  getBooking(requestData: any): Observable<any> {
    const apiUrl = '/api/bookings/list';
    const url = environment.baseUrl  + apiUrl
    return this.http.post(apiUrl, requestData);
  }
  crearBooking(requestData: any): Observable<any> {
    const apiUrl = '/api/bookings/create';
    const url = environment.baseUrl  + apiUrl
    return this.http.post(apiUrl, requestData);
  }
  listarTemasBooking(requestData: any): Observable<any> {
    const apiUrl = '/api/bookings/listGroupThemesBooking';
    const url = environment.baseUrl  + apiUrl
    return this.http.post(apiUrl, requestData);
  }
  createPaymentIntent(requestData: any) {
    const apiurl = '/api/pay/create-payment-intent';
    const url = environment.baseUrl  + apiurl
    // console.log(`Enviando solicitud con amount=${amount}`);
    return this.http.post<any>(apiurl, requestData);
  }
  reagendarCita(requestData: any){
    const apiurl = '/api/bookings/reagendar';
    const url = environment.baseUrl  + apiurl
    return this.http.post<any>(apiurl, requestData);
  }
  registrarPreguntas(requestData: any){
    const apiurl = '/api/bookings/question';
    const url = environment.baseUrl  + apiurl
    return this.http.post<any>(apiurl, requestData);
  }
}
