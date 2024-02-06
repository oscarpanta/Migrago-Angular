import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../services/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarAdminGuard implements CanActivate {
  constructor(private authService: AutenticacionService,
    private router:Router){}

  canActivate(): Observable<boolean> | boolean{
    if(!this.authService.estalogeado()){
      this.router.navigate(['/admin/login']);
      return false;
    }else{
      const userRole = this.authService.getRolUsuario();
      console.log(userRole)
      if (userRole === '"ROLE_ADMIN"') {
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    }

  }

}
