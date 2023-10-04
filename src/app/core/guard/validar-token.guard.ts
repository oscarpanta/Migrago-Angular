import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,CanLoad,  Router,  RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AutenticacionService } from '../services/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
//export class ValidarTokenGuard implements CanActivate {
  export class ValidarTokenGuard  {
  constructor(private authService: AutenticacionService,
              private router:Router){}

  canActivate(): Observable<boolean> | boolean{
    if(!this.authService.estalogeado()){
      this.router.navigate(['/auth/login']);
      return false;
    }else{
      const userRole = this.authService.getRolUsuario();
      console.log(userRole)
      if (userRole === '"ROLE_CLIENT"') {
        console.log("abc")
        // El usuario tiene el rol "Cliente", permitir acceso a auth/dashboardCliente
        return true;
      } else if (userRole === '"ROLE_GUIDE"') {
        this.router.navigate(['/home']);
        // El usuario tiene el rol "Guia", permitir acceso a auth/dashboardGuia
        return false;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    }


    // return this.authService.validarToken()
    //     .pipe(
    //       tap(valid=>{
    //         if(!valid){
    //           this.router.navigateByUrl('/auth')
    //         }
    //       })
    //     )
  }
  // canLoad(): Observable<boolean> | boolean {
  //   return this.authService.validarToken()
  //       .pipe(
  //         tap(valid=>{
  //           if(!valid){
  //             this.router.navigateByUrl('/auth')
  //           }
  //         })
  //       )
  // }


}
