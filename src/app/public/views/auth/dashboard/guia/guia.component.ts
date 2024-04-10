import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/interfaces/login.interface';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import { ImagenesService } from '../../../services/imagenes.service';
import { SharedImageService } from '../../../services/shared-image.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { error } from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-guia',
  templateUrl: './guia.component.html',
  styleUrls: ['./guia.component.css']
})
export class GuiaComponent implements OnInit {
  usuario!: Usuario;
  guia: any[] = [];
  imageSrc!: string;
  miFormularioCobrar: FormGroup;
  miFormularioPaypal : FormGroup;
  totalamount! : number;

  formularioEnviadoPaypal = false;
  formularioEnviadoCobrar = false;
  textoBotonPaypal = 'Guardar cambios';
  textoBotonCobrar = 'Guardar cambios';

  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  constructor(private router: Router, private imagenservice: ImagenesService,private modalService: NgbModal,private fb: FormBuilder,
    private authService: AutenticacionService, private sharedImageService: SharedImageService, private cdr: ChangeDetectorRef) {
    // this.sharedImageService.currentImageUrl$.subscribe(newImageUrl => {
    //   this.GetUsuario()

    //   this.CargarImagen()
    //   this.cdr.detectChanges();
    // });
    this.miFormularioCobrar = this.fb.group({
      monto: ['', [Validators.required]]
    });

    this.miFormularioPaypal = this.fb.group({
      email: ['', [Validators.required,Validators.pattern(this.emailPattern)]]
    });
  }
  ngOnInit(): void {
    this.GetUsuario()
    // this.CargarImagen()
  }
  GetUsuario() {
    //this.usuario = this.authService.getUsuario();
    this.authService.getUsuario().subscribe((usuario: any) => {
      this.usuario = usuario;
      this.CargarImagen()
      console.log(this.usuario);
      this.miFormularioPaypal.get('email')?.setValue(usuario.account_paypal);
    });

    let req = {
      request: {
        id_user: this.usuario.id,
      }
    }

    this.authService.getDataGuia(req).subscribe(response => {



      if (response) {

        this.guia = response;
        this.setInputValidation();
        console.log(this.guia)
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
        }
      );

    }
    // this.imageSrc = this.imagenservice.getImageUrl(this.usuario.photo);



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

  setInputValidation() {
    this.totalamount = this.guia[0].amount_price;
    console.log(this.miFormularioCobrar)
    this.miFormularioCobrar.get('monto')?.setValidators(Validators.max(this.totalamount));
    this.miFormularioCobrar.get('monto')?.updateValueAndValidity();
  }

  abrirmodal(content: any) {
    this.modalService.dismissAll();
    this.modalService.open(content, { backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-actualizar' }).result.then(
      (result) => {
        // Manejar acciones después de que se cierre la modal (si es necesario).
      },
      (reason) => {
        // Manejar acciones si la modal se cierra de forma inesperada (si es necesario).
      }
    );
  }
  cerrarModal() {
    this.modalService.dismissAll();
  }
  RegistroCobrar(){

  }
  RegistroPaypal(){
    const { email } = this.miFormularioPaypal.value;

    this.textoBotonPaypal = 'Esperando registro';
    this.formularioEnviadoPaypal = true;

    const requestData = {
      request: {
        id_user: this.usuario.id,
        cuenta_paypal: email
      }
    };

    this.authService.userPaypal(requestData).subscribe(response => {
      console.log(response)
      if(!response.error)
      {
        this.formularioEnviadoPaypal = false;
        this.textoBotonPaypal = 'Guardar Cambios';
        this.cerrarModal()
        Swal.fire('Exito', 'Guardado Correctamente', 'success');
      }
      else{

          this.formularioEnviadoPaypal = false;
          this.textoBotonPaypal = 'Guardar Cambios';
          this.cerrarModal()
          Swal.fire('Error', 'Ha ocurrido un error', 'error');


      }
    });
  }

}
