import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { StripeCardComponent, StripeCardNumberComponent, StripeService } from 'ngx-stripe';
import {
  PaymentIntent,
  StripeCardElement,
  StripeCardElementOptions,
  StripeCardNumberElement,
  StripeElementsOptions,
} from '@stripe/stripe-js';

import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingsService } from '../../services/bookings.service';
import Swal from 'sweetalert2';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import { Usuario } from 'src/app/core/interfaces/login.interface';
import { Router } from '@angular/router';
import { JitsiService } from '../../services/jitsi.service';

@Component({
  selector: 'app-pago-cita',
  templateUrl: './pago-cita.component.html',
  styleUrls: ['./pago-cita.component.css']
})
export class PagoCitaComponent implements OnInit {
  //
  //@ViewChild(StripeCardComponent, { static: false }) card!: StripeCardComponent;
  @ViewChild(StripeCardNumberComponent) card!: StripeCardNumberComponent;
  usuario!: Usuario;
  formularioEnviado = false;
  public cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        fontWeight: 400,
        fontFamily: 'Circular',
        fontSize: '14px',
        iconColor: '#666EE8',
        color: '#002333',
        '::placeholder': {
          color: '#919191',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es'
  };
  paymentForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    amount: [90, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
  });

  constructor(private fb: FormBuilder, private stripeService: StripeService, private modalService: NgbModal,
    private bookingService: BookingsService, private authService: AutenticacionService, private router: Router,
      private jitsiService:JitsiService) { }
  ngOnInit(): void {
    this.GetUsuario()
    this.paymentForm.patchValue({
      name: this.usuario.name,
      email: this.usuario.username,
      amount: 90,
    })
   this.paymentForm.get('name')?.disable();
    //this.paymentForm.get('email')?.disable();
  //  this.paymentForm.get('amount')?.setValue(90);
    this.paymentForm.get('amount')?.disable();

  }
  GetUsuario() {
    //this.usuario = this.authService.getUsuario();
    this.authService.getUsuario().subscribe((usuario:any) => {
      this.usuario = usuario;
      console.log(this.usuario);
    });
  }


  pay(): void {
    console.log(this.paymentForm)
    this.formularioEnviado = true;
    if(this.card){
      if (this.paymentForm.valid || this.paymentForm.disabled) {
        const { name,email } = this.paymentForm.value;
        console.log(this.usuario)
        console.log(this.paymentForm.value)
        //let historia = this.historiaDetalle.story.data[0].title

        // if (localStorage.getItem('historia')) {
        //   // historia=localStorage.getItem('historia')
        // }

        const fechainicio = localStorage.getItem('fechainicio');
        const fechafin = localStorage.getItem('fechafin');
        let temasGuardados: any;
        const temasGuardadosString = localStorage.getItem('temas');
        const historiaString = localStorage.getItem('historia');
        let historiaData: any
        if (historiaString) {
          historiaData = JSON.parse(historiaString);

          // const storieId = historiaData.storie_id;
          //  const title = historiaData.title;
        }

        if (temasGuardadosString !== null) {
          temasGuardados = JSON.parse(temasGuardadosString);
        }


        let req = {

          amount: 9000,
          email: email,
          storie: historiaData.title

        }
        console.log(req)

        this.bookingService.createPaymentIntent(req).subscribe((response) => {
          console.log(response)
          Swal.fire({
            title: 'Procesando solicitud',
            text: 'Espera mientras se procesa la solicitud...',
            icon: 'info',
            allowOutsideClick: false, // Evita que el usuario cierre la alerta haciendo clic fuera de ella
            showCancelButton: false,
            showConfirmButton: false
          });
          console.log(this.card)
          if(this.card.element){
            this.stripeService.confirmCardPayment(response[0].client_secret, {
              payment_method: {
                card: this.card.element,
                billing_details: {
                  name: this.usuario.name,
                },
              },

            }).subscribe((result) => {

              if (result.error) {
                this.formularioEnviado = false;
                console.error(result.error.message);
                Swal.close();
                Swal.fire('Error', 'Ocurrio un error al pagar:'+ result.error.message, 'error')
              } else {
                if (result.paymentIntent.status === 'succeeded') {
                  this.jitsiService.moveRoom(this.jitsiService.namePrincipalRoom, true, this.usuario.name,this.usuario.username);
                  const link = this.jitsiService.getIFrameSrc();
                  console.log(link)
                  console.log('Pago exitoso');
                  //  const { temas, fechainicio, fechafin } = this.miFormulario.value;
                  let req = {
                    request: {
                      booking_id: 0,
                      story_id: historiaData.storie_id,
                      user_id: this.usuario.id,
                      time_booking: 60,
                      price_booking: 90,
                      startDate_booking: fechainicio,
                      endDate_booking: fechafin,
                      link_meeting: link,
                      payment_method: "Stripe Payment",
                      reason_cancel: "",
                      user_cancel_id: this.usuario.id,
                      in_status: "CREADO",
                      group_themes: temasGuardados.map((id: any) => ({
                        group_theme_id: id,
                        question: ""
                      })),
                      name_user:this.usuario.name,
                      email_user:this.usuario.username,
                      storie:historiaData.title,
                      order_id:response[0].metadata.order_id

                    }
                  }
                  console.log(req)
                  this.bookingService.crearBooking(req)
                    .subscribe(res => {
                       //  console.log(res[0].in_id);
                      console.log(res)
                      if (res[0][0].out_rpta === "OK") {
                        Swal.close();
                        //this.modalClose.nativeElement.click();
                        localStorage.removeItem('fechainicio');
                        localStorage.removeItem('fechafin');
                        localStorage.removeItem('temas');
                        localStorage.removeItem('historia')
                        this.formularioEnviado = false;
                        Swal.fire({
                          title: 'Exito',
                          text: 'Se ha registrado con Éxito',
                          icon: 'success',
                          timer: 2000, // Establece el tiempo en milisegundos (en este caso, 2 segundos)
                          showConfirmButton: false // Oculta el botón de confirmación
                        });

                        //Espera 2 segundos antes de abrir la modal de login
                        setTimeout(() => {
                          //this.router.navigate(['/historias']);
                          this.router.navigate(['/auth/dashboardCliente']);

                        }, 2000);
                      } else {
                        Swal.close();
                        this.formularioEnviado = false;
                        Swal.fire('Error', 'No se pudo registrar', 'error')
                      }
                    });


                }
              }
            });
          }
           else{
            Swal.fire('Error', 'No se pudo registrar', 'error')
           }
        });
      }
    }
    else {
      this.formularioEnviado = false;
      console.log(this.paymentForm);
      console.log(this.card);
    }
  }


}
