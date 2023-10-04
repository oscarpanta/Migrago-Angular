import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Nationalities } from '../interfaces/nationalities.interface';
import { Country } from '../interfaces/countries.interface';
import { Cities } from '../interfaces/cities.interface';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  constructor(private http: HttpClient) { }

  // getCountries(requestData: any): Observable<any> {
  getCountries(requestData: any): Observable<any> {
    const apiUrl = '/api/countries/list';
    const url = environment.baseUrl  + apiUrl
    // return this.http.post(apiUrl, requestData);
    return this.http.post<GetResponseCountries>(apiUrl, requestData);
  }

  getAllCities(requestData: any): Observable<any> {
    const apiUrl = `/api/cities/list`; // Ajusta la ruta para obtener todas las ciudades
    const url = environment.baseUrl  + apiUrl
    return this.http.post<GetResponseCities>(apiUrl, requestData);
  }

  getNationalities(requestData: any): Observable<any> {
    const  apiUrl  = '/api/nationalities/list';
    // return this.http.post(apiUrl, requestData);
    const url = environment.baseUrl  + apiUrl
    return this.http.post<GetResponseNationalities>(apiUrl, requestData);
   // return this.http.post<GetResponseNationalities>(apiUrl, requestData).pipe(map(response =>response.data));


  }





}

interface GetResponseCountries {
  link_First: number,
  linksNext: string,
  linksLast: number,
  linksPrevious: string,
  totalPages: number,
  totalElements: number,
  data: Country[]

}

interface GetResponseCities {
  link_First: number,
  linksNext: string,
  linksLast: number,
  linksPrevious: string,
  totalPages: number,
  totalElements: number,
  data: Cities[]

}

interface GetResponseNationalities {
  link_First: number,
  linksNext: string,
  linksLast: number,
  linksPrevious: string,
  totalPages: number,
  totalElements: number,
  data: Nationalities[]

}
// interface GetResponseNationalities {
//   linksFirst:    string;
//   linksNext:     null;
//   linksLast:     string;
//   linksPrevious: null;
//   totalPages:    string;
//   totalElements: string;
//   data:          Nationalities[];
// }
