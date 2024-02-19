import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
declare var google: any;
@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit{
  @Output() openModalRegister: EventEmitter<void> = new EventEmitter<void>();
  // @Output() nextseccion: EventEmitter<number> = new EventEmitter<number>();
  @Output() dataRegister: EventEmitter<any> = new EventEmitter<any>();


  miFormularioLogin: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  public data:any ={
    nextseccion:0,
    email:'',
    nombre:'',
    apellido:''
  }

  cargando:boolean=false;
  formularioEnviado = false;
  textoBoton = 'Registrarse';

  private clienteid= environment.clientId;
  constructor( private modalService: NgbModal,  private fb: FormBuilder,private changeDetector: ChangeDetectorRef, private authService: AutenticacionService,
   private router: Router) {


  }
  ngOnInit(): void {
    setTimeout(() => {
      google.accounts.id.initialize({
        //we need to get client id, so got to
        client_id: this.clienteid,
        callback: (resp: any) => {
          //u'll get client id and token here
          // u can console here what u will get
          this.handleLogin(resp);
        },
        cancel_on_tap_outside:false
      });

      google.accounts.id.renderButton(document.getElementById("google-btn"), {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: 500
      });

     }, 100);
  }

  abrirmodalregistro() {
    this.openModalRegister.emit();
  }
  cambiarseccion(){
    // this.nextseccion.emit(2)

    this.dataRegister.emit(this.data)
  }
  login() {
    const { username, password } = this.miFormularioLogin.value;

    let _req = {
      username: username,
      password: password

    };
    console.log(_req);

    this.authService.login(_req).subscribe((res: any) => {
      console.log(res)
      if (res) {
        if (res[0].roles[0].role_name == 'ROLE_CLIENT') {
          //  const {temas,fechainicio,fechafin } = this.miFormulario.value;
          //   localStorage.setItem('fechainicio', fechainicio);
          //   localStorage.setItem('fechafin', fechafin);
          //   localStorage.setItem('temas', JSON.stringify(this.groupThemeIds));
          this.modalService.dismissAll();
            this.formularioEnviado = false;
            this.textoBoton = 'Registrarse';
            // setTimeout(() => {
              this.router.navigate(['/historias/pagoCita']);
              setTimeout(() => {
                location.reload(); // Recarga la página después de 2 segundos
              }, 1000);
            // }, 2000);



        }
        else if (res[0].roles[0].role_name == 'ROLE_GUIDE') {
          this.router.navigate(['/historias']);
          Swal.fire('Error', 'Eres usuario a nivel guia, tu no puedes adquirir una cita', 'error')
          return
        }

      }
      else {
        console.log(res)
        // this.router.navigate(['/auth/dashboarCliente']);
        Swal.fire('Error', res, 'error')
      }
    },
      (error: any) => {
        console.error('Error:');
        Swal.fire('Error', 'Datos incorrectos', 'error')
      }
    );
    // } else {
    //   console.log('datos incompletos')
    //   console.log(this.req.username);
    //   console.log(this.req.password);
    // }
  }
  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]))  //we need payload of the token i.e 2nd part[1],first part is header i.e [0], 3rd part is secret
  }
  handleLogin(resp: any) {
    //resp : u will get credential from that u need to decrypt the
    this.cargando=true;
    if (resp) {

      const payLoad = this.decodeToken(resp.credential);
          this.authService.sendTokenToBackend(resp.credential)
        .subscribe((response:any) => {
          console.log(response);
          console.log(response.error);
          if(response){
            if(response.error){
              let _req = {
                username:payLoad.email ,
                password: ''

              };
              this.authService.login(_req).subscribe((res: any) => {

                if (res) {
                  this.cargando=false
                  // this.mandarlocalstorage()
                  this.modalService.dismissAll();
                  // Swal.fire('Hecho', 'Has accedido a tu cuenta exitosamente', 'success')

                  Swal.fire({
                    title: 'Hecho',
                    text: 'Has accedido a tu cuenta exitosamente',
                    icon: 'success',

                  }).then(() => {

                    this.router.navigate(['/historias/pagoCita']);//REVISAR
                setTimeout(() => {
                  location.reload(); // Recarga la página después de 2 segundos
                }, 1000);


                  })


                }
                else {
                  this.cargando=false
                  console.log(res)
                  Swal.fire('Error', res, 'error')
                }


              },
              (error: any) => {
                this.cargando=false
                Swal.fire('Error', 'Ha ocurrido un error', 'error')
              }


              );


            }


            else{
              this.cargando=false
              this.data.nextseccion=2
              this.data.email=payLoad.email
              this.data.nombre=payLoad.given_name
              this.data.apellido=payLoad.family_name
              this.dataRegister.emit(this.data)
              // this.cambiarseccion()


             this.abrirmodalregistro()

              // this.miFormularioLogin.get('nombre')?.setValue(payLoad.given_name);
              // this.miFormularioLogin.get('apellidos')?.setValue(payLoad.family_name);
              // this.miFormularioLogin.get('email')?.setValue(payLoad.email);
              // this.miFormularioLogin.get('password')?.clearValidators();
              // this.miFormularioLogin.get('password')?.updateValueAndValidity();

              // this.tipolog = 1;
              // this.seccion=2;
            }

          }


      }, error => {
        this.cargando=false
        console.error(error);

      });


    }
  }
}
