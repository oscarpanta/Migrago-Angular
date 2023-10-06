import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/core/interfaces/login.interface';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import { BookingsService } from 'src/app/public/views/services/bookings.service';
import Swal from 'sweetalert2';
//import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

//registerLocaleData(localeEs);
@Component({
  selector: 'app-agendadas-guia',
  templateUrl: './agendadas-guia.component.html',
  styleUrls: ['./agendadas-guia.component.css']
})
export class AgendadasGuiaComponent implements OnInit{
  usuario!:Usuario
  agendadasGuia: any[] = [];
  agendadasDetalle:any[] = [];
  agendadaSeleccionada: any;
  miFormulario!: FormGroup;
  idguia:any;
  citaid:any;
  constructor(private agendadasService: BookingsService, private authService: AutenticacionService,
              private fb: FormBuilder,) {
    this.miFormulario = this.fb.group({
      motivo:['', [Validators.required]],
      // fechainicio: ['', [Validators.required]],
      // fechafin: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    this.GetUsuario()
    this.GetGuiaId()

    this.listaAgendadasGuia()
  }

  GetUsuario() {
    this.usuario = this.authService.getUsuario();
  }

  GetGuiaId() {
      this.idguia = this.authService.getGuia()?.trim();
      this.idguia = Number(this.idguia.replace(/[^0-9]/g, ''));

  }

  listaAgendadasGuia() {
    const requestData = {
      request: {
        booking_id:null,
        customer_id:null,
        guide_id:this.idguia,
        startDate:null,
        endDate:null,
        status: null
      },
      order: {
        column: null,
        mode: null
      },
      page_size: 100,
      pgination_key: 1
    };

    this.agendadasService.getBooking(requestData).subscribe(
      response => {
        console.log('agendadas=' + JSON.stringify(response));
        this.agendadasGuia = response[0].data;
        console.log(this.agendadasGuia)

      }


    );

  }

  obtenerDetalleAgendada(agendada:any) {
    this.agendadaSeleccionada=[]
    this.agendadaSeleccionada = agendada;
    console.log(agendada)

    const requestData = {
      request: {
        booking_id:agendada.id,

      },
      order: {
        column: null,
        mode: null
      },
      page_size: 100,
      pgination_key: 1
    };

    this.agendadasService.listarTemasBooking(requestData).subscribe(
      response => {
        console.log('agendadas=' + JSON.stringify(response));
        this.agendadasDetalle = response[0].data;
        console.log(this.agendadasDetalle)
       // this.agendadaSeleccionada = agendada;
        this.citaid=agendada.id
      }


    );

  }

  RegistroReagendar(){
    const { motivo} = this.miFormulario.value;

    let req = {
      request: {
        booking_id: this.citaid,
        startDate_booking: null,
        endDate_booking: null,
        link_meeting: null,
        reason_reagendar: motivo,
        user_reagenda: this.usuario.id,
        in_status:"REAGENDADA",
        tipo_user:7

      }
    }
    console.log(req)
    this.agendadasService.reagendarCita(req)
      .subscribe(res => {
        //  console.log(res[0].in_id);
        if (res[0][0].out_rpta === "OK") {
          //this.modalClose.nativeElement.click();

          Swal.fire('Hecho', 'Se ha procesado su reagenda.', 'success')
        } else {
          Swal.fire('Error', 'No se pudo reagendar', 'error')
        }
      });
  }
}
