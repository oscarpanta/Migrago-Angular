import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, ViewChild } from "@angular/core";
import { catchError, Observable, map, of, tap, BehaviorSubject, Subscription, interval } from "rxjs";
//import { JwtHelperService } from "@auth0/angular-jwt";

//import { Endpoints } from "../config/endpoints";
import { Router } from "@angular/router";
//import { HttpCoreService } from "./http-core.service";
import { environment } from "src/environments/environment";
import { AuthResponse, Usuario, Roles, UsuarioResponse } from '../interfaces/login.interface';
import Swal from "sweetalert2";
import { addTokenHeader } from "../interceptor/interceptor.interceptor";


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private url = environment.baseUrl
  private apiUrl = '/api/login';
  // private baseUrl: string = environment.baseUrl;

  // private _usuario!: Usuario;
  private _usuario!: Usuario;

  mibehaviorsubject = new BehaviorSubject<Usuario | null>(null)

  getUsuario(): any {
    const usuarioLocalStorage = JSON.parse(localStorage.getItem('userdata')!);

    // Si se encuentra en el almacenamiento local
    if (usuarioLocalStorage) {
      this.mibehaviorsubject.next(usuarioLocalStorage);
      console.log(this.mibehaviorsubject.next(usuarioLocalStorage))
    } else {
      this.mibehaviorsubject.next({ ...this._usuario });

    }

    return this.mibehaviorsubject.asObservable();
  }
  getUsuario2(): Observable<Usuario | null> {
    const usuarioLocalStorage = JSON.parse(localStorage.getItem('userdata')!);

    // Si se encuentra en el almacenamiento local
    if (usuarioLocalStorage) {
      this.mibehaviorsubject.next(usuarioLocalStorage);
    } else {
      this.mibehaviorsubject.next({ ...this._usuario });
    }

    return this.mibehaviorsubject.asObservable();
  }



  // getUsuario(): any {
  //   const usuarioLocalStorage = JSON.parse(localStorage.getItem('userdata')!) ;

  //   // Si se encuentra en el almacenamiento local
  //   if (usuarioLocalStorage) {
  //     this.mibehaviorsubject.next(usuarioLocalStorage)
  //    // return usuarioLocalStorage;
  //    console.log(this.mibehaviorsubject.next(usuarioLocalStorage))
  //    console.log(this.mibehaviorsubject.asObservable())
  //    return this.mibehaviorsubject.asObservable()
  //   }
  //   this.mibehaviorsubject.next( {...this._usuario})
  //   return this.mibehaviorsubject.asObservable()
  //  // return { ...this._usuario };
  //  }




  actualizarUsuarioGuia(requestData: any): Observable<any> {
    const apiUrl = '/api/update';
    return this.http.post(apiUrl, requestData,{context: addTokenHeader()});
  }
  actualizarUsuarioCliente(requestData: any): Observable<any> {
    const apiUrl = '/api/update_cliente';
    return this.http.post(apiUrl, requestData,{context: addTokenHeader()});
  }

  getDataGuia(requestData: any): Observable<any> {
    const apiUrl = '/api/getDataGuia';
    return this.http.post(apiUrl, requestData);
  }




  getDetalleGuia(id:number): Observable<any> {
    const apiUrl = `/api/getGuide/${id}`;

    return this.http.get(apiUrl,{context: addTokenHeader()});
  }

  getListaGuias(requestData: any): Observable<any> {
    const apiUrl = '/api/listGuides';
    return this.http.post(apiUrl, requestData,{context: addTokenHeader()});
  }
  updateGuia(requestData: any): Observable<any> {
    const apiUrl = '/api/updateStatusGuide';
    return this.http.post(apiUrl, requestData,{context: addTokenHeader()});
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
          console.log(resp.error);
          throw new Error(resp[0].error);
        } else {
          console.log(resp);
          console.log(resp[0].access_token);
          if(resp[0].roles[0].role_name === 'ROLE_ADMIN')
           {
            Swal.fire('Error', 'Usuario invalido', 'error')
            return
          }

          localStorage.setItem('token', resp[0].access_token);
          localStorage.setItem('userdata', JSON.stringify(resp[0].usuario));
          localStorage.setItem('rol', JSON.stringify(resp[0].roles[0].role_name));
          if (resp[0].guia != null) {
            localStorage.setItem('guia', JSON.stringify(resp[0].guia.id_guia));
          }
          if (resp[0].cliente != null) {
            // localStorage.setItem('cliente', JSON.stringify(resp[0].cliente.id));
            localStorage.setItem('cliente', JSON.stringify(resp[0].cliente.customer_id));

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
            phone: resp[0].usuario.phone,
            birth_date: resp[0].usuario.birth_date,
            flagdata:resp[0].usuario.flagdata,
            flagpass:resp[0].usuario.flagpass,
            account_paypal:resp[0].usuario.account_paypal,
          };
          // this.mibehaviorsubject.next(this._usuario)
          console.log(this._usuario);
        }
      })
    );
  }

  loginAdmin(data: any) {
    return this.http.post<AuthResponse>(this.apiUrl, data).pipe(
      tap((resp: any) => {
        console.log(resp)
        if (resp.error) {
          console.log(resp.error)
          Swal.fire('Error', resp.error, 'error')
        } else {


          if (resp[0].roles[0].role_name === 'ROLE_ADMIN') {

            localStorage.setItem('token', resp[0].access_token);
            localStorage.setItem('userdata', JSON.stringify(resp[0].usuario));
            localStorage.setItem('rol', JSON.stringify(resp[0].roles[0].role_name));
           // localStorage.setItem('guia', JSON.stringify(resp[0].guia.id_guia));

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
              phone: resp[0].usuario.phone,
              birth_date: resp[0].usuario.birth_date,
              flagdata:resp[0].usuario.flagdata,
              flagpass:resp[0].usuario.flagpass,
              account_paypal:resp[0].usuario.account_paypal,
            };
          }
          else {

            Swal.fire('Error', 'Usuario invalido', 'error') }


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
    return this.http.post(apiUrl, requestData,{context: addTokenHeader()});
  }

  sendTokenToBackend(idToken: string) {
    const body = { id_token: idToken };
    const apiUrl = '/api/auhtGoogle';
    return this.http.post(apiUrl, body);
  }
  usuarioEmail(requestData: any): Observable<any> {
    const apiUrl = '/api/auhtUser';
    // return this.http.post(apiUrl, requestData);
    return this.http.post(apiUrl, requestData);
  }
  LoginWithFacebook(credentials: string):Observable<any> {
    const body = { id_token: credentials };
    const apiUrl = '/api/auhtFacebook';
    return this.http.post(apiUrl,body);
  }
  userPaypal(requestData: any):Observable<any> {
    const apiUrl = '/api/updatePaypal';
    return this.http.post(apiUrl, requestData,{context: addTokenHeader()});
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
  getGuia() {
    return localStorage.getItem('guia');
  }
  getCliente() {
    return localStorage.getItem('cliente');
  }

}
