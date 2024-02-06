import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';

const AUTH_TOKEN = new HttpContextToken<boolean>(() => false);

export function addTokenHeader() {
  return new HttpContext().set(AUTH_TOKEN, true);
}

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  // constructor(private router:Router,private inject:Injector) {}

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   let authservice = this.inject.get(AutenticacionService)
  //   console.log('Interceptor is running');
  //   let jwtToken = request.clone({
  //     setHeaders:{
  //       Authorization: 'Bearer ' +authservice.getToken()
  //     }
  //   })
  //   return next.handle(jwtToken);

  // }


  constructor(private authService: AutenticacionService,private router: Router) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // request =this.addToken(request)
    // return next.handle(request);

    request = this.addToken(request);

    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401 && error.error?.error === 'Expired token') {
          console.log("error")
          // Token expirado, realiza las acciones correspondientes
          this.handleExpiredToken();
        }

        return throwError(error);
      })
    );


  }
  private addToken(request: HttpRequest<unknown>) {
    if (request.context.get(AUTH_TOKEN)) {
      const token = this.authService.getToken()
      if (token) {
        const authRequest = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${token}`)
        });
        return authRequest
      }
      return request

    }
    return request
  }

  private handleExpiredToken() {
    // Limpiar localStorage y redirigir al login
    this.authService.logout();
    this.router.navigate(['/auth/login']); // Ajusta la ruta según tu configuración
  }
}
