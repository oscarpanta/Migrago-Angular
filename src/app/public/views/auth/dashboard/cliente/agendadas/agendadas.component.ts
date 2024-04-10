import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/interfaces/login.interface';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import { DateService } from 'src/app/core/utils/date.service';
import { BookingsService } from 'src/app/public/views/services/bookings.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agendadas',
  templateUrl: './agendadas.component.html',
  styleUrls: ['./agendadas.component.css']
})
export class AgendadasComponent {


  agendadasCliente: any[] = [];
  agendadasDetalle: any[] = [];
  guiaId!: number
  cantTemas!: number
  bookingid!:number
  usuario!: Usuario;
  // agendadaSeleccionada: any;
  idcliente: any;
  miFormulario!: FormGroup;
  groupThemeIds: string[] = [];
  detailGroupThemeIds: string[] = [];

  constructor(private agendadasService: BookingsService, private authService: AutenticacionService,
    private router: Router, private fb: FormBuilder,private fechaservice:DateService) {
    this.miFormulario = this.fb.group({
      preguntas: this.fb.array([])
    });
  }
  ngOnInit(): void {
    this.GetUsuario()
    this.GetClienteId()
    this.listaAgendadasGuia()
  }



  GetClienteId() {
    this.idcliente = this.authService.getCliente()?.trim();
    this.idcliente = Number(this.idcliente.replace(/[^0-9]/g, ''));
    console.log('idcg'+this.idcliente)


  }
  GetUsuario() {
    //this.usuario = this.authService.getUsuario();
    this.authService.getUsuario().subscribe((usuario:any) => {
      this.usuario = usuario;
      console.log(this.usuario);
    });
  }
  listaAgendadasGuia() {
    console.log('idc'+this.idcliente)
    const requestData = {
      request: {
        booking_id: null,
        customer_id: this.idcliente,
        guide_id: null,
        startDate: null,
        endDate: null,
        status: null
      },
      order: {
        column: null,
        mode: null
      },
      page_size: 100,
      pgination_key: 1
    };
    console.log('reques')
    console.log(requestData)

    this.agendadasService.getBooking(requestData).subscribe(
      response => {
        console.log('agendadas=' + JSON.stringify(response));

        console.log( response[0].data[0].booking_start_date)
          response[0].data.forEach((date:any) => {
            date.booking_start_date=this.fechaservice.formatDatetimeToString(date.booking_start_date)

      });

        this.agendadasCliente = response[0].data;
        // this.agendadasCliente[0].booking_start_date=this.fechaservice.formatDatetimeToString(this.agendadasCliente[0].booking_start_date)
        // this.agendadasCliente.
        console.log(this.agendadasCliente)

        this.cantTemas = response[0].totalElements;
      }


    );

  }

  obtenerDetalleAgendada(agendada: any) {
    // this.agendadaSeleccionada = agendada;
    const requestData = {
      request: {
        booking_id: agendada.id,

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
        this.cantTemas = response[0].totalElements;
        this.guiaId = agendada.guide_id
        this.bookingid=agendada.id
        // for (const tema of this.agendadasDetalle) {
        //   const control = this.fb.control(tema.question, Validators.required);
        //   (this.miFormulario.get('preguntas') as FormArray).push(control);
        //   console.log()
        // }
        const preguntasFormArray = this.miFormulario.get('preguntas') as FormArray;
        preguntasFormArray.clear();
        for (const tema of this.agendadasDetalle) {
          const control = this.fb.control(tema.question, Validators.required);
          preguntasFormArray.push(control);
          this.groupThemeIds.push(tema.group_theme_id);
          this.detailGroupThemeIds.push(tema.id);
        }
      }


    );

  }
  navegarReagenda() {

    localStorage.setItem('guiaid', String(this.guiaId));
    localStorage.setItem('citaid', this.agendadasDetalle[0].booking_id);
    this.router.navigate(['/auth/reagendar']);
  }
  RegistroPreguntas() {

    const preguntas = this.miFormulario.get('preguntas')?.value.map((pregunta: string, index: number) => ({
      detail_group_theme_id: this.detailGroupThemeIds[index], // Usamos el valor guardado
      group_theme_id: this.groupThemeIds[index], // Usamos el valor guardado
      question: pregunta
    }));
    console.log(preguntas)

    const requestData = {
      request: {
        booking_id: this.bookingid,
        user_id: this.usuario.id,
        group_themes: preguntas
      }
    }

    this.agendadasService.registrarPreguntas(requestData).subscribe(
      res => {
        console.log(res);
        if(res[0][0].out_rpta === "OK"){

          Swal.fire('Hecho', 'Se han registrado tus preguntas.', 'success')
        } else {
          Swal.fire('Error', 'No se pudo registrar', 'error')
        }

      }


    );
  }

  getControls() {
    return (this.miFormulario.get('preguntas') as FormArray).controls.map(control => control as FormControl);
  }

  AnularCita(){
  //  const { motivo} = this.miFormulario.value;

    let req = {
      request: {
        booking_id: this.bookingid,
        startDate_booking: null,
        endDate_booking: null,
        link_meeting: null,
        reason_cancellation: '',
        user_cencela:this.usuario.id,
        in_status:"ANULADA"

      }
    }
    console.log(req)
    this.agendadasService.anularCita(req)
      .subscribe(res => {
        //  console.log(res[0].in_id);
        if (res[0][0].out_rpta === "OK") {
          //this.modalClose.nativeElement.click();
          this.listaAgendadasGuia()
          Swal.fire('Hecho', 'Se ha anulado su cita. Deberás de agendar una nueva cita con otro guía', 'success')
        } else {
          Swal.fire('Error', 'No se pudo anular', 'error')
        }
      });
  }
}
