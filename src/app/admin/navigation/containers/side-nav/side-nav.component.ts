import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SideNavItems, SideNavSection } from '../../models/navigation.model';
import { NavigationService } from '../../services/navigation.service';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import { Usuario } from 'src/app/core/interfaces/login.interface';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit,OnDestroy {

  @Input() sidenavStyle!: string;
  @Input() sideNavItems!: SideNavItems;
  @Input() sideNavSections!: SideNavSection[];


  usuario!: Usuario;
  subscription: Subscription = new Subscription();
  routeDataSubscription!: Subscription;

 // constructor(public navigationService: NavigationService, public userService: UserService) {}
  constructor(public navigationService: NavigationService,private authService: AutenticacionService) {}

  ngOnInit() {
    this.GetUsuario()
  }

  GetUsuario() {
    //this.usuario = this.authService.getUsuario();
    this.authService.getUsuario().subscribe((usuario:any) => {
      this.usuario = usuario;
      console.log(this.usuario);
    });
  }
  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
}
