import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-modal',
  templateUrl: './registro-modal.component.html',
  styleUrls: ['./registro-modal.component.css']
})
export class RegistroModalComponent {

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();  //Salida de evento para cerrar modal

  miFormulario:FormGroup=this.fb.group({
    email:['',[Validators.required,Validators.minLength(5)]],
    password:['',[Validators.required,Validators.minLength(6)]],
  });
  constructor(private fb:FormBuilder,
    private router:Router,
    private authService:AutenticacionService,
    private activeModal: NgbActiveModal){}
    registro(){
      console.log(this.miFormulario.value);
      const {email,password} = this.miFormulario.value;
      let req = {
        request: {
          id:0,
          dni:null,
          name:null,
          lastname:null,
          username: email,
          password: password,
          sexo:null,
          photo:null,
          status:true,
          phone:null,
          birth_date:null,
          rol:6

        }


      };
      //console.log(this.miFormulario.valid);
     // this.router.navigateByUrl('/dashboard');
        this.authService.registro(req)
        .subscribe( res=>{
            console.log(res);
            //console.log(res[0][0].out_rpta);
            if (res.msg==="Usuario registrado") {
              this.closeModal.emit();
              this.router.navigate(['/auth/login']);
              // if(res[0].roles[0].role_name == 'ROLE_CLIENT'){
              //   this.router.navigate(['/auth/dashboardCliente']);


              // }
              // else if(res[0].roles[0].role_name== 'ROLE_GUIDE'){

              //   this.router.navigate(['/auth/dashboardGuia']);
              // }

            }
            else {
              console.log(res)
              // this.router.navigate(['/auth/dashboarCliente']);
              Swal.fire('Error', "Este usuario ya se encuentra registrado",'error')
            }
        },
        (error: any) => {
        //  console.error('Error:', error);
          Swal.fire('Error', 'Datos incorrectos','error')
        }

        );


    }

}
