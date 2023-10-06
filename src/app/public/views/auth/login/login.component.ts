import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/public/layout/layout.service';
import * as sha512 from 'js-sha512';
import * as sha256 from 'js-sha256'
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthResponse } from 'src/app/core/interfaces/login.interface';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  miFormulario:FormGroup=this.fb.group({
    username:['',[Validators.required]],
    password:['',[Validators.required]],
  });

  // req = {
  //   username: "",
  //   password: "",
  // };
  constructor( private fb:FormBuilder,private router:Router,private displayService: LayoutService,private authService:AutenticacionService){}
  ngOnInit(): void {
    this.ocultarpass();
    this.displayService.setNavigationVisibility(false);
  }

  ngOnDestroy(): void {
    this.displayService.setNavigationVisibility(true);
  }

  ocultarpass(){
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
    const {username,password} = this.miFormulario.value;

    let _req = {
      username: username,
      //password: sha256.sha256(password).toString().toUpperCase(),
      password: password

    };
    console.log(_req);
    // if (!(this.req.username == '' || this.req.username == undefined) && !(this.req.password == '' || this.req.password == undefined)) {
      this.authService.login(_req).subscribe((res:any)=> {
        console.log(res)
        if (res) {
          if(res[0].roles[0].role_name == 'ROLE_CLIENT'){
            this.router.navigate(['/auth/dashboardCliente']);


          }
          else if(res[0].roles[0].role_name== 'ROLE_GUIDE'){

            this.router.navigate(['/auth/dashboardGuia']);
          }

        }
        else {
          console.log(res)
          // this.router.navigate(['/auth/dashboarCliente']);
          Swal.fire('Error',res,'error')
        }
      },
        (error: any) => {
          console.error('Error:');
          Swal.fire('Error', 'Datos incorrectos','error')
        }
      );
    // } else {
    //   console.log('datos incompletos')
    //   console.log(this.req.username);
    //   console.log(this.req.password);
    // }
  }

}
