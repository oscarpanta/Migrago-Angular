import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import allLocales from '@fullcalendar/core/locales-all';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvailabilitiesService } from '../../services/availabilities.service';
import { Usuario } from '../../../../core/interfaces/login.interface';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import { JitsiService } from '../../services/jitsi.service';
import { BookingsService } from '../../services/bookings.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reagendar',
  templateUrl: './reagendar.component.html',
  styleUrls: ['./reagendar.component.css']
})
export class ReagendarComponent implements OnInit {

  usuario!:Usuario
  selectedDate: string | null = null;
  showEventList: boolean = true;
  selectedEventCalendar2: any = null;

  section2: number = 0;

  calendarVisible = true;
  calendarVisibleForSection2 = false;
  calendarOptionsForSection2: any = {};
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
      right: 'dayGridMonth'
    },
    //initialView: 'listWeek',
    locales: allLocales,
    locale: 'es',

    initialView: 'dayGridMonth',
    //initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    //weekends: true,
    // editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    //eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),

    events: []


  };
  currentEvents: EventApi[] = [];
  miFormulario!: FormGroup;
  guiaid!:any;
  citaid!:any;
  constructor(private changeDetector: ChangeDetectorRef, private datePipe: DatePipe, private fb: FormBuilder, private router: Router,
    private disponibleService: AvailabilitiesService,private authService:AutenticacionService,private jitsiService:JitsiService,
    private bookingService: BookingsService) {
    this.miFormulario = this.fb.group({

      fechainicio: ['', [Validators.required]],
      fechafin: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    this.GetUsuario()

    this.guiaid=localStorage.getItem('guiaid')
    this.citaid=localStorage.getItem('citaid')
    console.log(this.guiaid)

    this.CargarEvents()

  }

  GetUsuario() {
    //this.usuario = this.authService.getUsuario();
    this.authService.getUsuario().subscribe((usuario:any) => {
      this.usuario = usuario;
      console.log(this.usuario);
    });
  }
  handleDateSelect(arg: any) {
    this.selectedDate = arg.startStr;
    this.showEventList = false;
    this.section2=1
    //this.currentSection = 3;
    //this.showCalendarOnly();
    // if (this.currentSection !== 2) {
    //   this.currentSection = 2;
    //   this.showEventList = false;
    // }
    this.loadEventsForSelectedDate(this.selectedDate!);
  }
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  loadEventsForSelectedDate(date: string) {
    this.resetCalendarStateForSection2();
    console.log(date)
    const fechaActual = new Date();
    const fechaFormateada = `${fechaActual.getFullYear()}-${String(fechaActual.getMonth() + 1).padStart(2, '0')}-${String(fechaActual.getDate()).padStart(2, '0')}`;

    const requestData = {
      request: {
        guide_id: this.guiaid,
        dateNow: fechaFormateada,
        dateRequest: date,
        status: true
      },
      order: {
        column: null,
        mode: null
      },
      page_size: 100,
      pgination_key: 1
    };

    this.disponibleService.getDisponibilidad(requestData).subscribe(data => {
      this.calendarVisibleForSection2 = true;
      console.log(data)
      const events = data[0].data.map((item: any) => {
        return {
          id: item.id,
          // title: `Evento ${item.id}`,
          title: `DISPONIBLE`,
          start: item.availability_start_date,
          end: item.availability_end_date
        };
      });

      // Crea un nuevo calendarioOptions solo para esta sección
      const calendarOptionsForSection2 = {
        plugins: [
          interactionPlugin,
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
        ],
        // headerToolbar: {
        //   right: 'listWeek'
        // },

        // views: {
        //   timeGridOneDay: {
        //     type: 'listWeek',
        //     duration: { days: 1 },
        //     buttonText: '1 day'
        //   }
        // },
        headerToolbar: false,
        initialView: 'listWeek',
        views: {
          listWeek: {
            type: 'timeGrid',
            duration: { days: 1 },
            buttonText: '1 day'
          }
        },
        events: events,
        initialDate: date,
        noEventsContent: 'Sin Disponibilidad',
        eventClick: this.handleEventClickForSection2.bind(this)
      };

      // Asigna el nuevo calendarOptions a una propiedad en tu componente
      this.calendarOptionsForSection2 = calendarOptionsForSection2;
      // this.calendarOptionsForSection2.initialDate = date;

    });



  }
  resetCalendarStateForSection2() {
    // Reinicia la visibilidad y los eventos del calendario
    this.calendarVisibleForSection2 = false;
    this.calendarOptionsForSection2.events = [];
  }

  handleEventClickForSection2(arg: any) {
    // const startDate = arg.event.start;
    // const endDate = arg.event.end;
    const startDate = this.datePipe.transform(arg.event.start, 'yyyy-MM-dd HH:mm:ss');
    const endDate = this.datePipe.transform(arg.event.end, 'yyyy-MM-dd HH:mm:ss');



    console.log('Fecha de Inicio:', startDate);
    console.log('Fecha de Fin:', endDate);
    this.miFormulario.patchValue({
      fechainicio: startDate,
      fechafin: endDate
    });
    console.log(this.miFormulario)
    console.log(this.miFormulario.valid)
    console.log(this.miFormulario.value)
    console.log(this.miFormulario.errors)


    if (this.selectedEventCalendar2) {
      this.selectedEventCalendar2.el.classList.remove('selected-event');
    }

    arg.el.classList.add('selected-event');
    this.selectedEventCalendar2 = arg;
  }

  prevSection() {

    this.showEventList = true
    this.section2=0
    // console.log(this.miFormulario.valid)
    this.miFormulario = this.fb.group({
      fechainicio: '',
      fechafin: ''
    });

  }

  RegistroReagendar() {
    const {  fechainicio, fechafin } = this.miFormulario.value;
    this.jitsiService.moveRoom(this.jitsiService.namePrincipalRoom, true, this.usuario.name,this.usuario.username);
    const link = this.jitsiService.getIFrameSrc();
    //let tipousuario;

    // if(localStorage.getItem('rol') == '"ROLE_CLIENT"'){
    //   tipousuario=6
    // }
    // else{
    //   tipousuario=7
    // }

    let req = {
      request: {
        booking_id: this.citaid,
        startDate_booking: fechainicio,
        endDate_booking: fechafin,
        link_meeting: null,
        reason_reagendar: "",
        user_reagenda: this.usuario.id,
        in_status:"REAGENDADA",
        tipo_user:6

      }
    }
    console.log(req)
    this.bookingService.reagendarCita(req)
      .subscribe(res => {
        //  console.log(res[0].in_id);
        console.log(res)
        if (res[0][0].out_rpta === "OK") {
          //this.modalClose.nativeElement.click();
          localStorage.removeItem('guiaid');
          localStorage.removeItem('citaid');
          Swal.fire({
            title: 'Exito',
            text: 'Cita reagendada con éxito',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });

          //Espera 2 segundos antes de abrir la modal de login
          setTimeout(() => {
            this.router.navigate(['/historias']);
          }, 2000);

        //  Swal.fire('Hecho', 'Cita reagendada con éxito', 'success')
        } else {
          Swal.fire('Error', 'No se pudo registrar', 'error')
        }
      });

  }

  CargarEvents() {
    const fechaActual = new Date();
    const fechaFormateada = `${fechaActual.getFullYear()}-${String(fechaActual.getMonth() + 1).padStart(2, '0')}-${String(fechaActual.getDate()).padStart(2, '0')}`;

    const requestData = {
      request: {
        guide_id: this.guiaid,
        dateNow: fechaFormateada,
        dateRequest: null,
        status: true
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
      const events = data[0].data.map((item: any) => {
        return {
          id: item.id,
          title: `DISPONIBLE`,
          start: item.availability_start_date,
          end: item.availability_end_date
        };
      });
      this.calendarOptions.events = events;
      // this.currentEvents = this.calendarOptions.events;
    });
  }
}
