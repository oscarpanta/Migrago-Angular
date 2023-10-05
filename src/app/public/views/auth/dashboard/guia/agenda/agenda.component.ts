import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';


import { CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { INITIAL_EVENTS, createEventId } from './util/event-utils';
import { NgbModal, ModalDismissReasons, NgbDatepickerModule, } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import allLocales from '@fullcalendar/core/locales-all';
import { AvailabilitiesService } from 'src/app/public/views/services/availabilities.service';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import { Usuario } from 'src/app/core/interfaces/login.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit{

  // eventoTitulo: string = '';
  // eventoHorario: string = '';
  // horaInicial: string = '';
  // horaFinal: string = '';
  guiaid!:any;
  usuario!: Usuario;
  //miFormulario: FormGroup;
  //mostrarModal = false;
  closeResult = '';
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    locales: allLocales,
    locale: 'es',

    initialView: 'dayGridMonth',
   // dayCellContent: {html: 'Su texto'},
    //initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
   // editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),


    events:[]
    //  dateClick: function(info) {

    // //   //alert('Clicked on: ' + info.dateStr);
    // //   alert('Clicked on: ' + info.view.title);
    //  },
    //titleFormat:`[Calendario]`

  };




  currentEvents: EventApi[] = [];

  constructor(private changeDetector: ChangeDetectorRef, private activeModal: NgbModal,private disponibleService:AvailabilitiesService,
              private authService:AutenticacionService) {

  }
  ngOnInit(): void {
    this.GetGuiaId()
    this.GetUsuario()
    this.CargarEvents()
  }


  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  // handleDateSelect(selectInfo: DateSelectArg) {
  //   const title = prompt('Please enter a new title for your event');
  //   const time = prompt('Please enter a time range for your event (e.g., "5-6 PM")');
  //   const calendarApi = selectInfo.view.calendar;

  //   calendarApi.unselect(); // clear date selection

  //   if (title) {
  //     calendarApi.addEvent(
  //       {
  //         id: "1",
  //         //title,
  //         title: `${title} (${time})`, // Agregar el título y el horario
  //         start: selectInfo.startStr,
  //         end: selectInfo.endStr,
  //         allDay: selectInfo.allDay,
  //         //url:"google.com"
  //       },


  //     );
  //   }
  // }
  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    const modalRef = this.activeModal.open(ModalComponent); // Cambiar ModalContentComponent por el nombre real de tu componente de modal




    calendarApi.unselect(); // Limpiar selección de fecha


    // Pasar las variables a la modal
    // modalRef.componentInstance.horaInicial = this.horaInicial;
    // modalRef.componentInstance.horaFinal = this.horaFinal;

    modalRef.result.then((result) => {

      // const fechaInicial = new Date(selectInfo.startStr + 'T' + this.horaInicial);
      // const fechaFinal = new Date(selectInfo.startStr + 'T' + this.horaFinal);
      const fechaInicial = new Date(selectInfo.startStr + 'T' + result.horaInicial );
      const fechaFinal = new Date(selectInfo.startStr + 'T' + result.horaFinal);

        // El usuario hizo clic en "Guardar Evento"
      console.log('Guardando evento...');
      console.log(`Inicial: ${result.horaInicial}, Final: ${result.horaFinal}`);
      console.log(fechaInicial)
      console.log(fechaFinal)
      console.log(fechaInicial.toISOString())
      console.log(fechaFinal.toISOString())
      console.log(fechaInicial.toLocaleString())
      console.log(fechaFinal.toLocaleString())
      if (fechaInicial < fechaFinal) {

        let req = {
          request: {
            guide_id: this.guiaid,
            user_id: this.usuario.id,
            id_availability: 0,
            start_date: fechaInicial.toLocaleString(),
            end_date: fechaFinal.toLocaleString(),
            status: true,
          },
          order: {
            column: null,
            mode: null
          },
          page_size: 100,
          pgination_key: 1
        }
        console.log(req)

        this.disponibleService.crearDisponibilidad(req).subscribe(response => {
          console.log(response)
          if (response.msg[0].out_rpta=="OK") {

            // calendarApi.addEvent(
            //   {
            //     id: createEventId(),
            //     //title,
            //     title: `${result.horaInicial} (${result.horaFinal})`,
            //    // start: '2023-09-15 12:00:00',
            //   //  end: '2023-09-15 13:00:00',
            //     // start: selectInfo.startStr,
            //     // end: selectInfo.endStr,
            //     start: fechaInicial.toISOString(),
            //     end: fechaFinal.toISOString(),
            //     allDay: false,
            //    // allDay: selectInfo.allDay,
            //     //url:"google.com"
            //   },


            // );
            Swal.fire('Hecho', 'Se ha registrado con exito', 'success')
            this.CargarEvents()

          }
         else {
          Swal.fire('Error', 'No se pudo registrar', 'error')
          }


        });


        // calendarApi.addEvent(
        //   {
        //     id: createEventId(),
        //     //title,
        //     title: `${result.horaInicial} (${result.horaFinal})`, // Agregar el título y el horario
        //    // start: '2023-09-15 12:00:00',
        //   //  end: '2023-09-15 13:00:00',
        //     // start: selectInfo.startStr,
        //     // end: selectInfo.endStr,
        //     start: fechaInicial.toISOString(),
        //     end: fechaFinal.toISOString(),
        //     allDay: false,
        //    // allDay: selectInfo.allDay,
        //     //url:"google.com"
        //   },


        // );
      } else {
        alert('La hora inicial debe ser menor que la hora final.');
      }



    }, (reason) => {
      // El usuario cerró la modal sin guardar
      console.log('Modal cerrada sin guardar');
    });
  }

  handleEventClick(clickInfo: EventClickArg) {


    // ESTO ELIMINA:
    if (confirm(`¿Quieres eliminar el evento? '${clickInfo.event.title}'`)) {

      let req = {
        request: {
          guide_id: this.guiaid,
          user_id: this.usuario.id,
          id_availability: clickInfo.event.id,
          start_date: clickInfo.event.startStr,
          end_date:  clickInfo.event.endStr,
          status: false,
        },
        order: {
          column: null,
          mode: null
        },
        page_size: 100,
        pgination_key: 1
      }
      console.log(req)

      this.disponibleService.crearDisponibilidad(req).subscribe(response => {
        console.log(response)
        if (response.msg[0].out_rpta=="OK") {
          clickInfo.event.remove();
          this.CargarEvents()
          Swal.fire('Hecho', 'Se ha eliminado con exito', 'success')

        }
       else {
        Swal.fire('Error', 'No se pudo elimminar', 'error')
        }
      });


    }
  // if (confirm(`¿Seguro que quieres editar el evento '${clickInfo.event.title}'?`)) {
  //   const modalRef = this.activeModal.open(ModalComponent);
  //   modalRef.componentInstance.horaInicial = clickInfo.event.startStr.split('T')[1].slice(0, 5);
  //   modalRef.componentInstance.horaFinal = clickInfo.event.endStr.split('T')[1].slice(0, 5);
  //   modalRef.componentInstance.eventoId = clickInfo.event.id;
  //   console.log(clickInfo.event.id)
  //   modalRef.result.then((result) => {
  //     const fechaInicial = new Date(clickInfo.event.startStr.split('T')[0] + 'T' + result.horaInicial + ':00');
  //     const fechaFinal = new Date(clickInfo.event.startStr.split('T')[0] + 'T' + result.horaFinal + ':00');
  //     const id=clickInfo.event.id;
  //     console.log(id);
  //     if (fechaInicial < fechaFinal) {
  //       clickInfo.event.setProp('title', `${result.horaInicial} (${result.horaFinal})`);
  //       clickInfo.event.setStart(fechaInicial);
  //       clickInfo.event.setEnd(fechaFinal);

  //       let req = {
  //         request: {
  //           guide_id: this.guiaid,
  //           user_id: this.usuario.id,
  //           id_availability: id,
  //           start_date: fechaInicial.toLocaleString(),
  //           end_date: fechaFinal.toLocaleString(),
  //           status: true,
  //         },
  //         order: {
  //           column: null,
  //           mode: null
  //         },
  //         page_size: 100,
  //         pgination_key: 1
  //       }
  //       console.log(req)

  //       this.disponibleService.crearDisponibilidad(req).subscribe(response => {
  //         console.log(response)
  //         if (response.msg[0].out_rpta=="OK") {
  //           this.CargarEvents()
  //           Swal.fire('Hecho', 'Se ha editado con exito', 'success')

  //         }
  //        else {
  //         Swal.fire('Error', 'No se pudo editar', 'error')
  //         }


  //       });

  //     } else {
  //       alert('La hora inicial debe ser menor que la hora final.');
  //     }
  //   }, (reason) => {
  //     console.log('Modal cerrada sin guardar');
  //   });
  // }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  // open(content: any) {
  //   this.activeModal.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
  //     // Aquí puedes realizar acciones cuando la modal se cierra (si lo necesitas)
  //   }, (reason) => {
  //     // Aquí puedes realizar acciones si la modal se cierra debido a una razón específica
  //   });
  // }

  open(content: any) {
    this.activeModal.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
  openModal() {
    const modalRef = this.activeModal.open(ModalComponent);
    modalRef.result.then((result) => {
      // Manejar los datos resultantes del modal aquí
      console.log(result); // Esto debería mostrar los datos del modal
    }).catch((reason) => {
      // Manejar cualquier error o cierre del modal aquí
      console.error(reason);
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  GetUsuario() {
    //this.usuario =  this.authService.usuario;
    this.usuario = this.authService.getUsuario();
  }
  GetGuiaId() {
    try {
      this.guiaid = this.authService.getGuia()?.trim();
      this.guiaid = Number(this.guiaid.replace(/[^0-9]/g, ''));
      console.log(this.authService.getGuia()?.trim())
      console.log(this.guiaid);
    } catch (error) {
      console.error("Error al convertir a número:", error);
    }
  }
  CargarEvents() {
    const fechaActual = new Date();
    const fechaFormateada = `${fechaActual.getFullYear()}-${String(fechaActual.getMonth() + 1).padStart(2, '0')}-${String(fechaActual.getDate()).padStart(2, '0')}`;

    const requestData = {
      request: {
        guide_id:this.guiaid,
        dateNow: fechaFormateada,
        dateRequest:null,
        status:true
      },
      order: {
        column: null,
        mode: null
      },
      page_size: 100,
      pgination_key: 1
    };
    console.log(requestData)
    this.disponibleService.getDisponibilidad(requestData).subscribe(data => {
      console.log(data)
      // Aquí deberías transformar los datos en el formato que FullCalendar espera
      const events = data[0].data.map((item:any) => {
        return {
          id: item.id,
          title: `DISPONIBLE`,
          start: item.availability_start_date,
          end: item.availability_end_date,

        };
      });


      this.calendarOptions.events = events;
     // this.currentEvents = this.calendarOptions.events;
    });
  }

}








// selectedOption: any = null;
// ngOnInit(): void {
//   this.selectedOption = null;
//      this.selectedOption = this.options[0]; // Opción por defecto después de la carga
// }
// constructor(private cdr: ChangeDetectorRef){this.selectedOption = null;}

// options = [
//   { text: 'Peru', image: 'assets/images/flags/tiny/Peru.png' },
//   { text: 'EE.UU', image: 'assets/images/flags/tiny/United_States_of_America.png' },
//   // ... Agregar más opciones con rutas de imágenes
// ];
// onOptionSelect(option: any) {

//   this.selectedOption = option;
//   console.log('Selected:', option);

// }


