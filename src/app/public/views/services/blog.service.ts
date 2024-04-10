import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { addTokenHeader } from 'src/app/core/interceptor/interceptor.interceptor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  registrarBlog(requestData: any): Observable<any> {
    const apiUrl = '/api/blogs/create';
    const url = environment.baseUrl  + apiUrl
    return this.http.post(apiUrl, requestData,{context: addTokenHeader()});
  }
  actualizarBlog(requestData: any): Observable<any> {
    const apiUrl = '/api/blogs/update';
    const url = environment.baseUrl  + apiUrl
    return this.http.post(apiUrl, requestData,{context: addTokenHeader()});
  }

  listaBlogs(requestData: any): Observable<any> {
    const apiUrl = '/api/blogs/list'
    const url = environment.baseUrl  + apiUrl
    return this.http.post(apiUrl, requestData);
  }
  listaGetBlog(requestData: any): Observable<any> {
    const apiUrl = '/api/blogs/getBlog'
    const url = environment.baseUrl  + apiUrl
    return this.http.post(apiUrl, requestData);
  }
  listaCategorias(requestData: any): Observable<any> {
    const apiUrl = '/api/blogs/listCategory'
    const url = environment.baseUrl  + apiUrl
    return this.http.post(apiUrl, requestData);
  }
  getImageUrlBlog(fileName: string) {
    return this.baseUrl+`/uploads/img_blog/${fileName}`;

  }
}
