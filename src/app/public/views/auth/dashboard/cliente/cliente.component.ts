import { ChangeDetectorRef, Component } from '@angular/core';
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
  cliente: any[] = [];
  imageSrc!: string;
  constructor(private router: Router, private imagenservice: ImagenesService,
    private authService: AutenticacionService,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.GetUsuario();
   // this.CargarImagen()
  }
  GetUsuario() {
    //this.usuario = this.authService.getUsuario();
    this.authService.getUsuario().subscribe((usuario: any) => {
      this.usuario = usuario;
      console.log(this.usuario);
      this.CargarImagen()

    });

    let req = {
      request: {
        id_user: this.usuario.id,
      }
    }

    this.authService.getDataCliente(req).subscribe(response => {



      if (response) {

        this.cliente = response;
        console.log(this.cliente)
      }

    });
  }
  CargarImagen() {
    if (this.usuario.photo) {
      this.imagenservice.getImageUrl(this.usuario.photo)
      this.imagenservice.imageUrl$.subscribe(
        (url) => {
          console.log(url)
          this.imageSrc = url.toString();
        //  this.cdr.detectChanges();
          console.log(this.imageSrc )
        }
      );

    }



    else
      // this.imageSrc = 'assets/images/perfiles/profile1.jpg'
      this.imageSrc = 'assets/images/perfiles/perfil.png'


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
