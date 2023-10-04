import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../services/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class PagoGuard implements CanActivate {
  constructor(private authService: AutenticacionService,
    private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (!this.authService.estalogeado()) {
      this.router.navigate(['/historias']);
      return false
    }
    else if (localStorage.getItem('fechainicio') && localStorage.getItem('fechafin') && localStorage.getItem('temas') && localStorage.getItem('historia'))
      return true
    else {
      this.router.navigate(['/historias']);
      return false
    }

  }

}
