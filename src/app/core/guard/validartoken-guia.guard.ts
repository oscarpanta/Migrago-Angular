import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../services/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class ValidartokenGuiaGuard implements CanActivate {
  constructor(private authService: AutenticacionService,
    private router:Router){}
 canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean{
    if(!this.authService.estalogeado()){
      this.router.navigate(['/auth/login'],{queryParams:{redirectUrl:state.url}});
      return false;
    }else{
      const userRole = this.authService.getRolUsuario();
      console.log(userRole)
      if (userRole === '"ROLE_CLIENT"') {
        this.router.navigate(['/home']);
      //  this.router.navigate(['/auth/dashboardGuia']);
        return false;
      } else if (userRole === '"ROLE_GUIDE"') {

        return true;
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

}
