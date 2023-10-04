import { Injectable,Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';


@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private router:Router,private inject:Injector) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //let authservice = localStorage.getItem('token')
    let authservice = this.inject.get(AutenticacionService)
    console.log('Interceptor is running');
    let jwtToken = request.clone({
      setHeaders:{
        Authorization: 'Bearer ' +authservice.getToken()
      }
    })
    return next.handle(jwtToken);
    // let token = localStorage.getItem('token');
    // let req = request;
    // if(token){

    //   req=request.clone( {

    //     setHeaders:{
    //       Authorization:`Bearer ${token}`
    //     }
    //   });
    // }



    // return next.handle(req);
  }
}
