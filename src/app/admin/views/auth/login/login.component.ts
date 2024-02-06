import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import { LayoutService } from 'src/app/public/layout/layout.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  // req = {
  //   username: "",
  //   password: "",
  // };
  constructor(private fb: FormBuilder, private router: Router, private displayService: LayoutService, private authService: AutenticacionService) { }
  ngOnInit(): void {
   // this.ocultarpass();
    // this.displayService.setNavigationVisibility(false);
  }

  ngOnDestroy(): void {
    // this.displayService.setNavigationVisibility(true);
  }

  // ocultarpass() {
  //   window.addEventListener("load", function () {

  //     // icono para mostrar contraseña
  //     const showPassword: HTMLElement = document.querySelector('.show-password')!;
  //     showPassword.addEventListener('click', () => {

  //       // elementos input de tipo clave
  //       const password1: HTMLInputElement = document.querySelector('.password1')!;

  //       if (password1.type === "text") {
  //         password1.type = "password"
  //         showPassword.classList.remove("fa-eye-slash");
  //         showPassword.classList.add('fa-eye');
  //       } else {
  //         password1.type = "text"
  //         showPassword.classList.remove('fa-eye');
  //         showPassword.classList.add('fa-eye-slash');
  //       }

  //     })

  //   });


  // }
  login() {
    const { username, password } = this.miFormulario.value;

    let _req = {
      username: username,
      password: password

    };
    this.authService.loginAdmin(_req).subscribe((res: any) => {
      console.log(res)
      if (!res.error) {
        if(res[0].roles[0].role_name === 'ROLE_ADMIN')


        this.router.navigate(['/admin/dashboard']);

      }

    },

    );

  }


}
