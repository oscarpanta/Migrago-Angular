import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Guides } from '../interfaces/guides.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GuidesService {

  constructor(private http: HttpClient) { }

  getStories(requestData: any): Observable<any> {

    const apiUrl = '/api/guides/list';
    const url = environment.baseUrl  + apiUrl
    return this.http.post<GetResponseGuides>(apiUrl, requestData);
  }


}
interface GetResponseGuides {
  link_First: number,
  linksNext: string,
  linksLast: number,
  linksPrevious: string,
  totalPages: number,
  totalElements: number,
  data: Guides[]

}
