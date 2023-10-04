import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AvailabilitiesService {

  constructor(private http: HttpClient) { }

  getDisponibilidad(requestData: any): Observable<any> {
    const apiUrl = '/api/availabilities/list';
    const url = environment.baseUrl  + apiUrl
    // return this.http.post(apiUrl, requestData);
    return this.http.post(apiUrl, requestData);
  }
  crearDisponibilidad(requestData: any): Observable<any> {
    const apiUrl = '/api/availabilities/create';
    const url = environment.baseUrl  + apiUrl
    // return this.http.post(apiUrl, requestData);
    return this.http.post(apiUrl, requestData);
  }
}
