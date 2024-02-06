import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/interfaces/login.interface';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';

@Component({
  selector: 'app-top-nav-user',
  templateUrl: './top-nav-user.component.html',
  styleUrls: ['./top-nav-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopNavUserComponent implements OnInit{
  usuario!: Usuario;

  constructor(private router:Router,private authService: AutenticacionService) {}
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
  logout(){
    this.router.navigateByUrl('/admin/login');
    this.authService.logout();
  }
}
