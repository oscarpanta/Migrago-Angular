import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemasService {

  constructor(private http: HttpClient) { }

  getDataTema(requestData: any): Observable<any> {
    const apiUrl = '/api/themes/group/details_group_themes';
    const url = environment.baseUrl  + apiUrl

    return this.http.post<any>(apiUrl, requestData);
  }
}
