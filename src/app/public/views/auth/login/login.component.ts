import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/public/layout/layout.service';
import * as sha512 from 'js-sha512';
import * as sha256 from 'js-sha256'
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthResponse } from 'src/app/core/interfaces/login.interface';
import { environment } from 'src/environments/environment';
declare var google: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ocultarpas: boolean = true;

  miFormulario: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  private clienteid= environment.clientId;

  // req = {
  //   username: "",
  //   password: "",
  // };
  constructor(private fb: FormBuilder, private router: Router, private displayService: LayoutService, private authService: AutenticacionService) { }
  ngOnInit(): void {
    this.ocultarpass();
    this.displayService.setNavigationVisibility(false);

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
        width: 300
      });

     }, 100);
  }

  ngOnDestroy(): void {
    this.displayService.setNavigationVisibility(true);
  }

  ocultarpass1() {
    // a=!a;
    this.ocultarpas = !this.ocultarpas;
  }
  ocultarpass() {
    window.addEventListener("load", function () {

      // icono para mostrar contraseña
      const showPassword: HTMLElement = document.querySelector('.show-password')!;
      showPassword.addEventListener('click', () => {

        // elementos input de tipo clave
        const password1: HTMLInputElement = document.querySelector('.password1')!;

        if (password1.type === "text") {
          password1.type = "password"
          showPassword.classList.remove("fa-eye-slash");
          showPassword.classList.add('fa-eye');
        } else {
          password1.type = "text"
          showPassword.classList.remove('fa-eye');
          showPassword.classList.add('fa-eye-slash');
        }

      })

    });


  }
  login() {
    console.log(this.miFormulario.value);
    const { username, password } = this.miFormulario.value;

    let _req = {
      username: username,
      //password: sha256.sha256(password).toString().toUpperCase(),
      password: password

    };
    console.log(_req);
    // if (!(this.req.username == '' || this.req.username == undefined) && !(this.req.password == '' || this.req.password == undefined)) {
    this.authService.login(_req).subscribe((res: any) => {
      console.log(res)
      if (res) {
        if (res[0].roles[0].role_name == 'ROLE_CLIENT') {

          this.router.navigate(['/auth/dashboardCliente']);

        }
        else if (res[0].roles[0].role_name == 'ROLE_GUIDE') {

          if (res[0].usuario.flagpass === '0') {
            this.router.navigate(['/auth/dashboardGuia/cambiar']);
            Swal.fire({
              title: 'Alerta',
              text: 'Debes cambiar tu contraseña',
              icon: 'warning',
              timer: 2000,
              showConfirmButton: true
            });
          }
          else
           {
            this.router.navigate(['/auth/dashboardGuia']);}



       //   this.router.navigate(['/auth/dashboardGuia']);
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
    if (resp) {

      console.log(resp.credential)
      // this.isGoogleAuthenticated = true;
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
                  this.router.navigate(['/auth/dashboardCliente']);
                }
                else {
                  console.log(res)
                  // this.router.navigate(['/auth/dashboarCliente']);
                  Swal.fire('Error', res, 'error')
                }


              },
              (error: any) => {

                Swal.fire('Error', 'Ha ocurrido un error', 'error')
              }


              );


            }


            else{
              // sessionStorage.setItem('loggedInUser', JSON.stringify(payLoad));
              console.log(payLoad)
              console.log(payLoad.email)
              console.log(JSON.stringify(response.user))
               localStorage.setItem('loggedInUser', JSON.stringify(response.user));
               localStorage.setItem('nextseccion',JSON.stringify(true))
               this.router.navigate(['auth/registro']);
            }

          }


      }, error => {
        console.error(error);

      });

      //store it in session

      //naviagte to home page or browse page
      // this.router.navigate(['browse']);
    }
  }

}
