
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/interfaces/login.interface';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambiar-contrasena-guia',
  templateUrl: './cambiar-contrasena-guia.component.html',
  styleUrls: ['./cambiar-contrasena-guia.component.css']
})
export class CambiarContrasenaGuiaComponent implements OnInit{

  ocultarpas: boolean = true;
  ocultarpas2: boolean = true;
  miFormulario:FormGroup=this.fb.group({
    passActual:['',[Validators.required]],
    password:['',[Validators.required]],
    password2:['',[Validators.required]]
  });
  usuario!: Usuario;

  constructor(private fb:FormBuilder,private authService:AutenticacionService, private router: Router){

  }

  ngOnInit(): void {
    this.GetUsuario();
    this.miFormulario=this.fb.group({
      passActual:['',[Validators.required]],
      password:['',[Validators.required]],
      password2:['',[Validators.required]]
    });

  }
  limpiarFormulario(){
    this.miFormulario=this.fb.group({
      passActual:['',[Validators.required]],
      password:['',[Validators.required]],
      password2:['',[Validators.required]]
    });
  }
  GetUsuario(){
    //this.usuario = this.authService.getUsuario();
    this.authService.getUsuario().subscribe((usuario:any) => {
      this.usuario = usuario;
      console.log(this.usuario);
    });
  }
  ocultarpass1() {
    this.ocultarpas = !this.ocultarpas;
  }

  ocultarpass2() {
    // a=!a;
     this.ocultarpas2 = !this.ocultarpas2;
   }
   cambiarContrasena(){
    console.log(this.miFormulario.value);
    const {passActual,password,password2} = this.miFormulario.value;
    if(password!=password2){
      Swal.fire('Error', "Contraseñas diferentes",'error');
      return
    }

    let req = {
      request: {
        password: passActual,
        password_new: password2,
        user_id:this.usuario.id,
      }
    };
      this.authService.cambiarContra(req)
      .subscribe( res=>{
          console.log(res);
          if (res.msg==="Modificado con éxito") {
            this.usuario = {
              ...this.usuario,
              flagpass: "1"
            }
            localStorage.setItem('userdata', JSON.stringify(this.usuario));
            if(this.usuario.flagdata=="0")
              // if(this.usuario.name==null  || this.usuario.lastname==null || this.usuario.photo==null || this.usuario.phone==null
              //   || this.usuario.sex==null || this.usuario.birth_date==null )
              {



                Swal.fire({
                  title: 'Exito',
                  text: res.msg+' Actualiza tu perfil porfavor',
                  icon: 'success',
                  timer: 2000, // Establece el tiempo en milisegundos (en este caso, 2 segundos)
                  showConfirmButton: false // Oculta el botón de confirmación
                });

                //Espera 2 segundos antes de abrir la modal de login
                setTimeout(() => {
                  //this.router.navigate(['/historias']);
                  this.router.navigate(['/auth/dashboardGuia/perfil']);

                }, 2000);
              }
              else{
                Swal.fire('Bien', res.msg,'success')
              }

            this.limpiarFormulario();

          }
          else {
            console.log(res)
            // this.router.navigate(['/auth/dashboarCliente']);
            Swal.fire('Error', res.msg,'error')
          }
      },
      (error: any) => {
        Swal.fire('Error', 'No se pudo modificar','error')
      }

      );

   }
}
