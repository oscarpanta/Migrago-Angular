import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, ViewChild } from "@angular/core";
import { catchError, Observable, map, of, tap, BehaviorSubject, Subscription, interval } from "rxjs";
//import { JwtHelperService } from "@auth0/angular-jwt";

//import { Endpoints } from "../config/endpoints";
import { Router } from "@angular/router";
//import { HttpCoreService } from "./http-core.service";
import { environment } from "src/environments/environment";
import { AuthResponse, Usuario, Roles, UsuarioResponse } from '../interfaces/login.interface';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private url = environment.baseUrl
  private apiUrl = '/api/login';
  // private baseUrl: string = environment.baseUrl;

  // private _usuario!: Usuario;
  private _usuario!: Usuario;

  getUsuario(): Usuario {
    const usuarioLocalStorage = JSON.parse(localStorage.getItem('userdata')!) ;

    // Si se encuentra en el almacenamiento local
    if (usuarioLocalStorage) {
      return usuarioLocalStorage;
    }

    return { ...this._usuario };
   }

  actualizarUsuarioGuia(requestData: any): Observable<any> {
    const apiUrl = '/api/update';
    return this.http.post(apiUrl, requestData);
  }
  actualizarUsuarioCliente(requestData: any): Observable<any> {
    const apiUrl = '/api/update_cliente';
    return this.http.post(apiUrl, requestData);
  }

  getDataGuia(requestData: any): Observable<any> {
    const apiUrl = '/api/getDataGuia';
    return this.http.post(apiUrl, requestData);
  }
  getDataCliente(requestData: any): Observable<any> {
    const apiUrl = '/api/getDataCliente';
    return this.http.post(apiUrl, requestData);
  }

  get usuario() {
    return { ...this._usuario };
  }
  constructor(private router: Router, private http: HttpClient) { }


  login(data: any) {
    return this.http.post<AuthResponse>(this.apiUrl, data).pipe(
      tap((resp: any) => {
        if (resp.error) {
          console.log("error");
          throw new Error(resp[0].error);
        } else {
          console.log(resp);
          console.log(resp[0].access_token);
          localStorage.setItem('token', resp[0].access_token);
          localStorage.setItem('userdata', JSON.stringify(resp[0].usuario));
          localStorage.setItem('rol', JSON.stringify(resp[0].roles[0].role_name));
          if(resp[0].guia!=null){
            localStorage.setItem('guia', JSON.stringify(resp[0].guia.id_guia));
          }
          if(resp[0].cliente!=null){
            localStorage.setItem('cliente', JSON.stringify(resp[0].cliente.id));
          }

          this._usuario = {
            id: resp[0].usuario.id,
            dni: resp[0].usuario.dni,
            name: resp[0].usuario.name,
            lastname: resp[0].usuario.lastname,
            username: resp[0].usuario.username,
            sex: resp[0].usuario.sex,
            photo: resp[0].usuario.photo,
            enabled: resp[0].usuario.enabled,
            first_session: resp[0].usuario.id.first_session,
            cod_gen: resp[0].usuario.cod_gen,
            user_created_id: resp[0].usuario.user_created_id,
            created_at: resp[0].usuario.created_at,
            user_updated_id: resp[0].usuario.user_updated_id,
            updated_at: resp[0].usuario.updated_at,
            phone:resp[0].usuario.phone,
            birth_date:resp[0].usuario.birth_date
          };
          console.log(this._usuario);
        }
      })
    );
  }


  registro(data: any) {
    // const apiUrl='api/register'
    return this.http.post<UsuarioResponse>('api/register', data).pipe(tap((resp: any) => {
      console.log(resp)
    }))
  }
  cambiarContra(requestData: any): Observable<any> {
    const apiUrl = '/api/change_pass';
    // return this.http.post(apiUrl, requestData);
    return this.http.post(apiUrl, requestData);
  }




  logout() {
    // localStorage.removeItem('token')
    localStorage.clear();
  }
  estalogeado() {
    return localStorage.getItem('token') != null;
  }
  getRolUsuario(): string | null {
    return localStorage.getItem('rol');
  }
  getToken() {
    return localStorage.getItem('token') || '';
  }
  getGuia(){
    return localStorage.getItem('guia');
  }
  getCliente(){
    return localStorage.getItem('cliente');
  }

}
