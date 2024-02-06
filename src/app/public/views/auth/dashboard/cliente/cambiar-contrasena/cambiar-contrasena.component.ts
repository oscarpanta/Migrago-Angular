import { AfterContentInit, AfterViewInit, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/core/interfaces/login.interface';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css']
})
export class CambiarContrasenaComponent implements OnInit{
  ocultarpas: boolean = true;
  ocultarpas2: boolean = true;
  miFormulario:FormGroup=this.fb.group({
    passActual:['',[Validators.required]],
    password:['',[Validators.required]],
    password2:['',[Validators.required]]
  });
  usuario!: Usuario;
  constructor(private fb:FormBuilder,private authService:AutenticacionService){

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
   // a=!a;
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
            Swal.fire('Bien', res.msg,'success')
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
