import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroes.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroeService {

//   private baseUrl:string = environment.baseUrl;

//   constructor(private http: HttpClient) { }
//  // getHeroe(){
//   getHeroes():Observable<Heroe[]>{
//     return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`)
//   }
//   getHeroeId(id:string):Observable<Heroe>{
//     return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`)
//   }
//   getSugerencias(termino : string):Observable<Heroe[]>{
//     return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=6`)
//   }
//   agregarHeroe(heroe:Heroe):Observable<Heroe>{
//     return this.http.post<Heroe>(`${this.baseUrl}/heroes`,heroe)
//   }
//   actualizarHeroe(heroe:Heroe):Observable<Heroe>{
//     return this.http.put<Heroe>(`${this.baseUrl}/heroes/${heroe.id}`,heroe)
//   }
//   borrarrHeroe(id:string):Observable<any>{
//     return this.http.delete<any>(`${this.baseUrl}/heroes/${id}`)
//   }
}
