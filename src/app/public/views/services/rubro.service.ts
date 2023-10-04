import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RubroService {

  constructor(private http: HttpClient) { }

  getRubros(requestData: any): Observable<any> {
    const apiUrl = '/api/rubro_laboral';
    const url = environment.baseUrl  + apiUrl
    // return this.http.post(apiUrl, requestData);
    return this.http.post(apiUrl, requestData);
  }
}
