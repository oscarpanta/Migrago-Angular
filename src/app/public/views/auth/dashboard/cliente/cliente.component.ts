import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/interfaces/login.interface';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import { ImagenesService } from '../../../services/imagenes.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
  usuario!: Usuario;
  imageSrc!: string;
  constructor(private router:Router, private imagenservice: ImagenesService,
    private authService:AutenticacionService){}

    ngOnInit(): void {
      this.GetUsuario();
      this.CargarImagen()
    }
    GetUsuario() {
      this.usuario = this.authService.getUsuario();
    }
    CargarImagen() {
      if (this.usuario.photo)
        this.imageSrc = this.imagenservice.getImageUrl(this.usuario.photo);
      else
        this.imageSrc = 'assets/images/perfiles/profile1.jpg'

      console.log(this.usuario.photo)
      // if (newImageUrl) {
      //   this.imageSrc = newImageUrl;
      // }
      // this.cdr.detectChanges();
    }

  logout(){
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }
}
