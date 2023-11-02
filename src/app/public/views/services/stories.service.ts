import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataStories, ResponseStories, Stories, StoriesImages } from '../interfaces/stories.interface';
import { Country } from '../interfaces/countries.interface';
import { DetalleModoHistoria } from '../interfaces/waymigration.interface';
import { Data_Story_Reviews } from '../interfaces/reviews.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {
  constructor(private http: HttpClient) { }

  getStories(requestData: any): Observable<any> {
    const url = environment.baseUrl  + '/api/stories/list'
    const apiUrl = '/api/stories/list'
   // const apiUrl = 'https://migratego.com/MigragoBack/public/api/stories/list';

    return this.http.post<ResponseStories>(apiUrl , requestData);
   // return this.http.post<ResponseStories>(apiUrl, requestData).pipe(map(response =>response.data));
  }
  getStoriesDetalle(requestData: any): Observable<any> {
    const apiUrl = '/api/stories/get';
    const url = environment.baseUrl  + apiUrl
    return this.http.post<ResponseStoriesDetalle>(apiUrl, requestData);
  }
  getListaDetalleModeHiStory(requestData: any): Observable<any> {
    const apiUrl = '/api/migration-modes/listDetail_mode_story';
    const url = environment.baseUrl  + apiUrl
    return this.http.post<GetResponseDetalleHistoria>(apiUrl, requestData);
  }
  getListaImages(requestData: any): Observable<any>{
    const apiUrl = '/api/stories/images';
    const url = environment.baseUrl  + apiUrl
    return this.http.post<GetResponseStoriesImages>(apiUrl, requestData);
  }
  getListaReviews(requestData: any): Observable<any>{
    const apiUrl = '/api/stories/reviews/list';
    const url = environment.baseUrl  + apiUrl
    return this.http.post<GetResponseStoriesReviews>(apiUrl, requestData);
  }
  getListaRates(requestData: any): Observable<any>{
    const apiUrl = '/api/stories/listRates';
    const url = environment.baseUrl  + apiUrl
    return this.http.post(apiUrl, requestData);
  }
  getStoriesGuide(requestData: any): Observable<any>{
    const apiUrl = '/api/stories/list_stories_guia';
    const url = environment.baseUrl  + apiUrl
    return this.http.post(apiUrl, requestData);
  }
  insertarHistoria(requestData: any): Observable<any>{
    const apiUrl = '/api/stories/create';
    const url = environment.baseUrl  + apiUrl
    return this.http.post(apiUrl, requestData);
  }
  insertarReviews(requestData: any): Observable<any>{
    const apiUrl = '/api/stories/reviews/create';
    const url = environment.baseUrl  + apiUrl
    return this.http.post(apiUrl, requestData);
  }
  CambiarEstadoHistoria(requestData: any): Observable<any>{
    const apiUrl = '/api/stories/updateStatusStorie';
    const url = environment.baseUrl  + apiUrl
    return this.http.post(apiUrl, requestData);
  }
}

interface ResponseStoriesDetalle {
  link_First: number,
  linksNext: string,
  linksLast: number,
  linksPrevious: string,
  totalPages: number,
  totalElements: number,
  data: DataStoriesDetalle[]

}
interface DataStoriesDetalle {
  storie_id: string;
  title: string;
  guide_id: string;
  name: string;
  lastname: string;
  nationality_id: string;
  nationality_name: string;
  flag_img: string;
  photo_story: string;
  contry_id: string;
  country_name: string;
  city_id: string;
  city_name: string;
  way_migration_id: string;
  name_way_migration: string;
  arrival_date:Date;
  migration_mode_id:string;
  description_mode:string;
  story_text:Text;
  status: string;
  cod_gen: string;
  user_created_id: bigint;
  created_at: Date;
  user_updated_id: bigint;
  updated_at: Date;
}
interface GetResponseDetalleHistoria{
  link_First: number,
  linksNext: string,
  linksLast: number,
  linksPrevious: string,
  totalPages: number,
  totalElements: number,
  data:DetalleModoHistoria[]
}
interface GetResponseStoriesImages {
  link_First: number,
  linksNext: string,
  linksLast: number,
  linksPrevious: string,
  totalPages: number,
  totalElements: number,
  data: StoriesImages[]

}
interface GetResponseStoriesReviews {
  link_First: number,
  linksNext: string,
  linksLast: number,
  linksPrevious: string,
  totalPages: number,
  totalElements: number,
  data: Data_Story_Reviews[]

}
