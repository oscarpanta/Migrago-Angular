import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { addTokenHeader } from 'src/app/core/interceptor/interceptor.interceptor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
 private baseUrl: string = environment.baseUrl;

 private imageUrlSubject = new BehaviorSubject<string>('');
 imageUrl$ = this.imageUrlSubject.asObservable();

  constructor(private http: HttpClient) { }


  getImageUrl(fileName: string) {
    //return this.baseUrl+`/uploads/perfiles/${fileName}`;
    const imageUrl = this.baseUrl + `/uploads/perfiles/${fileName}`;
    this.imageUrlSubject.next(imageUrl);
  }
  getImageUrlUser(fileName: string) {
    return this.baseUrl+`/uploads/perfiles/${fileName}`;

  }


  // getImage(fileName: string) {
  //   return this.http.get(this.getImageUrl(fileName), { responseType: 'blob' });
  // }
  enviarImage(requestData: any): Observable<any> {
    const apiUrl = '/api/guardar_images';
    const url = environment.baseUrl  + apiUrl
    // return this.http.post(apiUrl, requestData);
    return this.http.post(apiUrl, requestData,{context: addTokenHeader()});
  }
  getImageUrlHistoria(fileName: string) {
    return this.baseUrl+`/uploads/story_images/${fileName}`;
  }
  enviarImageHistoria(requestData: any): Observable<any> {

    const apiUrl = '/api/stories/guardar_images';
    const url = environment.baseUrl  + apiUrl
    // return this.http.post(apiUrl, requestData);
    return this.http.post(apiUrl, requestData);
  }
}
