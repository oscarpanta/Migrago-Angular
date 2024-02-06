import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../services/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class IntentoLoginGuard implements CanActivate {

  constructor(
    private authService: AutenticacionService,
    private router: Router
  ) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (!this.authService.estalogeado()) {
      return true
    } else {
      const userRole = this.authService.getRolUsuario();
      if (userRole === '"ROLE_CLIENT"' || userRole === '"ROLE_GUIDE"')
        this.router.navigate(['/home']);
      else
        this.router.navigate(['/admin/dashboard']);

      return false
    }

    // const helper = new JwtHelperService();

    // let token = localStorage.getItem('token');

    // if(token == null) {
    //   return true;
    // } else {
    //   const isExpired = helper.isTokenExpired(token);
    //   if (isExpired) {
    //     console.log('Expirado')
    //     return true;
    //   } else {
    //     console.log('NO Expirado')
    //     this.router.navigate(['/inicio/home']);
    //     return false;
    //   }
    // }

  }


}

