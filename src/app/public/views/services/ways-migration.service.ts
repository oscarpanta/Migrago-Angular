import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetalleModoHistoria, WayMigration } from '../interfaces/waymigration.interface';
import { MigrationMode } from '../interfaces/migration_modes.interface';
import { Themes } from '../interfaces/themes.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WaysMigrationService {
  constructor(private http: HttpClient) { }

  getWayMigrations(requestData: any): Observable<any> {
    const apiUrl = '/api/ways/list';
    const url = environment.baseUrl  + apiUrl
    // return this.http.post(apiUrl, requestData);
    return this.http.post<GetResponsewaysmigration>(apiUrl, requestData);
  }
  getModesMigration(requestData: any): Observable<any> {
    const apiUrl = '/api/migration-modes/list';
    const url = environment.baseUrl  + apiUrl
    // return this.http.post(apiUrl, requestData);
    return this.http.post<GetResponseModeMigration>(apiUrl, requestData);
  }
  getThemes(requestData: any): Observable<any> {
    const apiUrl = '/api/themes/group/list';
    const url = environment.baseUrl  + apiUrl
    // return this.http.post(apiUrl, requestData);
    return this.http.post<GetResponseThemes>(apiUrl, requestData);
  }

}

interface GetResponsewaysmigration {
  link_First: number,
  linksNext: string,
  linksLast: number,
  linksPrevious: string,
  totalPages: number,
  totalElements: number,
  data: WayMigration[]

}

interface GetResponseModeMigration {
  link_First: number,
  linksNext: string,
  linksLast: number,
  linksPrevious: string,
  totalPages: number,
  totalElements: number,
  data: MigrationMode[]

}
interface GetResponseThemes{
  link_First: number,
  linksNext: string,
  linksLast: number,
  linksPrevious: string,
  totalPages: number,
  totalElements: number,
  data: Themes[]

}


