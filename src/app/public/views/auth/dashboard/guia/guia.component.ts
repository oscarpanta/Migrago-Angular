import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/interfaces/login.interface';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import { ImagenesService } from '../../../services/imagenes.service';
import { SharedImageService } from '../../../services/shared-image.service';

@Component({
  selector: 'app-guia',
  templateUrl: './guia.component.html',
  styleUrls: ['./guia.component.css']
})
export class GuiaComponent implements OnInit {
  usuario!: Usuario;
  imageSrc!: string;
  constructor(private router: Router, private imagenservice: ImagenesService,
    private authService: AutenticacionService, private sharedImageService: SharedImageService, private cdr: ChangeDetectorRef) {
    // this.sharedImageService.currentImageUrl$.subscribe(newImageUrl => {
    //   this.GetUsuario()

    //   this.CargarImagen()
    //   this.cdr.detectChanges();
    // });

  }
  ngOnInit(): void {
    this.GetUsuario()
    this.CargarImagen()
  }
  GetUsuario() {
    //this.usuario =  this.authService.usuario;
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

  logout() {
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }
}
