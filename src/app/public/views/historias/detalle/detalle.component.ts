import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoriesService } from '../../services/stories.service';
import { DatePipe } from '@angular/common';
import { DataStoriesDetalle } from '../../interfaces/stories.interface';
import { switchMap, tap } from 'rxjs';
import { ImagenesService } from '../../services/imagenes.service';
import { TemasService } from '../../services/temas.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/core/interfaces/login.interface';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import allLocales from '@fullcalendar/core/locales-all';
import { INITIAL_EVENTS } from '../../auth/dashboard/guia/agenda/util/event-utils';
import { AvailabilitiesService } from '../../services/availabilities.service';
import Swal from 'sweetalert2';
import { BookingsService } from '../../services/bookings.service';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import {
  PaymentIntent,
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { Nationalities } from '../../interfaces/nationalities.interface';
import { Cities } from '../../interfaces/cities.interface';
import { Country } from '../../interfaces/countries.interface';
import { CountriesService } from '../../services/countries.service';
import { notZeroValidator } from 'src/app/core/directives/not-zero.directive';
import { environment } from 'src/environments/environment';


// import Swiper from 'swiper';
declare let Swiper: any;
declare var bootstrap: any;
declare var $: any;
declare var google: any;
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit{
  //isInfoExtraVisible = false;
  @ViewChild('siguienteBtn') siguienteBtn!: ElementRef;
  @ViewChild('modalContinuacion') modalContinuacion!: any;
  @ViewChildren('checkboxes') checkboxes!: QueryList<ElementRef>;
  @ViewChild('modalLogin2') modalLogin: any;
  @ViewChild('modalPagos') modalPagos: any;
  @ViewChild('modalRegister') modalRegister: any;
  @ViewChild(StripeCardComponent, { static: false }) card!: StripeCardComponent;
  modalLoginOpened: boolean = false;
  modalRegisterOpened: boolean = false;



  storyId!: number;
  cantidadresenas: number = 0;
  diferenciames: number = 0;
  imageSrc1!: string;
  imageSrc2!: string;
  imageSrc3!: string;
  historiaDetalle!: any;
  historiaMiembros: any[] = []
  historiaImages: any[] = []
  historiaReviews: any[] = [];
  themas: any[] = []
  //historiaRates:any = {}
  historiaRates!: any;
  miFormulario!: FormGroup;
  groupThemeIds: any[] = [];
  // modalContinuacion: any;
  // datePipe: DatePipe = new DatePipe('en-US');
  guiaid!: any;
  perfilUrlImagen: any;
  usuario!: Usuario;
  estalogeado: boolean = false;
  rolUsuario: string | null = "";

  countries: Country[] = [];
  paismigra: Country[] = []
  cities: Cities[] = [];
  nationalities: Nationalities[] = []

  // selectedCountryId: number | null = null;
  // selectedCityId: number = 0;
  selectedCountryId: number | null = null;
  selectedCityId: number | null = null;
  selectedNationalityId: number = 0;
  selectedPaisMigraId: number = 0;
  ocultarpas: boolean = true;
  textoBoton = 'Registrarse';

  selectedOption: any ;
  options :any;


  currentSection = 1;
  seccion=1;
  selectedDate: string | null = null;
  showEventList: boolean = true;
  showSection3: boolean = false;
  selectedEventCalendar2: any = null;
  arr: any
  closeResult = '';
  citasRegistradas: any
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


  miFormularioLogin: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  formularioEnviado = false;
  miFormularioRegistro: FormGroup = this.fb.group({
    // email: ['', [Validators.required]],
    // password: ['', [Validators.required]],
    email:['',[Validators.required,Validators.minLength(5)]],
    password:['',[Validators.required,Validators.minLength(6)]],
    nombre: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    fechanac: ['', [Validators.required]],
    genero: ['', [Validators.required, notZeroValidator]],
    nacionalidad: [[0], [Validators.required, notZeroValidator]],
    // countrySelect: [[0], [Validators.required, notZeroValidator]],
    // citySelect: [[0], [Validators.required, notZeroValidator]],
    countrySelect: ['', [Validators.required, notZeroValidator]],
    citySelect: ['', [Validators.required, notZeroValidator]],
    fechatentativa: ['', [Validators.required]],
    numero: ['', [Validators.required]],
    paismigra: [[0], [Validators.required, notZeroValidator]],
  });

  calificacionSeleccionada: number | null = null;
  estrellas = [1, 2, 3, 4, 5];
  miFormularioReview: FormGroup = this.fb.group({
    comentario: ['', [Validators.required, Validators.minLength(5)]],
    calificacion: ['', Validators.required]
  });


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
    name: ['John', [Validators.required]],
    email: ['john@gmail.com', [Validators.required]],
    amount: [100, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
  });

  private clienteid= environment.clientId;
  tipolog = 0;
  cargando:boolean=false;
  data:any;
  //historiaDetalle: any[] = [];
  constructor(private route: ActivatedRoute,
    private historiasService: StoriesService, private modalService: NgbModal, private disponibleService: AvailabilitiesService,
    private imagenservice: ImagenesService, private fb: FormBuilder, private temas: TemasService,private country: CountriesService,
    private bookingService: BookingsService, private changeDetector: ChangeDetectorRef, private authService: AutenticacionService,
    private datePipe: DatePipe, private router: Router, private stripeService: StripeService) {
    this.miFormulario = this.fb.group({
      temas: [this.groupThemeIds, [Validators.required]],
      fechainicio: ['', [Validators.required]],
      fechafin: ['', [Validators.required]]
    });
  }
  ngAfterViewInit() {
    // const fechainicio = localStorage.getItem('fechainicio');
    // const fechafin = localStorage.getItem('fechafin');
    // let temasGuardados;
    // const temasGuardadosString = localStorage.getItem('temas');
    // const historiaString = localStorage.getItem('historia');
    // if (historiaString) {
    //   const historiaData = JSON.parse(historiaString);

    //   const storieId = historiaData.storie_id;
    //   const title = historiaData.title;
    // }

    // if (temasGuardadosString !== null) {
    //   temasGuardados = JSON.parse(temasGuardadosString);
    // }
    // if (fechainicio && fechafin) {
    //   const confirmarRegistro = confirm('¿Deseas registrar la cita?');

    //   if (confirmarRegistro) {
    //     if (this.usuario.name === null) {
    //       localStorage.removeItem('fechainicio');
    //       localStorage.removeItem('fechafin');
    //       localStorage.removeItem('temas');
    //       localStorage.removeItem('historia')

    //       Swal.fire('Error', 'Debes actualizar tu perfil para solicitar una cita', 'error')
    //       return
    //     }
    //     console.log(this.usuario)

    //     this.router.navigate(['/historias/pagoCita']);
    //   }
    //   else {
    //     localStorage.removeItem('fechainicio');
    //     localStorage.removeItem('fechafin');
    //     localStorage.removeItem('temas');
    //     localStorage.removeItem('historia')
    //   }


    // }
  }
  ngOnInit(): void {
    // this.pasos();
    setTimeout(() => {
      google.accounts.id.initialize({
        //we need to get client id, so got to
        client_id: this.clienteid,
        callback: (resp: any) => {
          //u'll get client id and token here
          // u can console here what u will get
          this.handleLogin(resp);
        },
        cancel_on_tap_outside:false
      });

      google.accounts.id.renderButton(document.getElementById("google-btn"), {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: 500
      });

      this.route.queryParams.subscribe(params => {
        this.storyId = params['historia_id'];
        if (this.storyId) {
          this.obtenerDetalleHistoria(this.storyId);
          this.obtenerDataTema();
          //  this.CargarEvents();
          // this.obtenerDetallesMiembros(this.storyId);
          // this.obtenerHistoriaImages(this.storyId);
          // this.obtenerHistoriaReviews(this.storyId);
          console.log(this.diferenciames)

        }
      });

     }, 100);
    this.logeado();

    this.listaPaises();
    this.listaNacionalidades();
    //this.GetUsuario()
    this.diferenciames = 0;


    console.log(this.historiaDetalle)
    //this.obtenerDetalleHistoria(1)




  }
  GetUsuario() {
    //this.usuario = this.authService.getUsuario();
    this.authService.getUsuario().subscribe((usuario: any) => {
      this.usuario = usuario;
      console.log(this.usuario);
    });
  }
  obtenerDetalleHistoria(storyId: number) {

    const requestData = {
      request: {
        story_id: storyId,
        status: "APROBADO"
      },
      order: {
        column: null,
        mode: null
      },
      page_size: 10,
      pgination_key: 1
    };

    this.historiasService.getStoriesDetalle(requestData).subscribe(response => {
      console.log(response.story.data[0].title)
      console.log(response.story.data[0].lastname)
      console.log(response.story.data[0].arrival_date)
      console.log(response.images_story.totalElements)
      if (response) {

        this.historiaDetalle = response;
        this.calcularDiferenciaFechas(this.historiaDetalle.story.data[0].arrival_date);
        this.guiaid = this.historiaDetalle.story.data[0].guide_id;
        this.guiaid = Number(this.guiaid.replace(/[^0-9]/g, ''));
        console.log(this.guiaid)
        console.log('a' + this.historiaDetalle)
        console.log("total rev:" + this.historiaDetalle.reviews.totalElements)
        this.slideContent();
        this.CargarEvents();
        // this.cdr.detectChanges();
      }
      console.log(response);
      console.log('a' + this.historiaDetalle)
      //  console.log(this.historiaDetalle.name)
      // this.historiaDetalle.name.split(' ')[0];
      if (this.historiaDetalle.story.data[0].photo) {
        this.perfilUrlImagen = this.imagenservice.getImageUrlUser(this.historiaDetalle.story.data[0].photo);
      } else {
        this.perfilUrlImagen = 'assets/images/perfiles/profile1.jpg';
      }



      if (response.images_story.data.length > 0) {

        for (const image of response.images_story.data) {
          if (image.flag === '1') {
            this.imageSrc1 = this.imagenservice.getImageUrlHistoria(image.image_story);
          } else if (image.flag === '2') {
            this.imageSrc2 = this.imagenservice.getImageUrlHistoria(image.image_story);
          } else if (image.flag === '3') {
            this.imageSrc3 = this.imagenservice.getImageUrlHistoria(image.image_story);
          }
        }
        if (!response.images_story.data.some((image: any) => image.flag === '1')) {
          this.imageSrc1 = '';
        }
        if (!response.images_story.data.some((image: any) => image.flag === '2')) {
          this.imageSrc2 = '';
        }
        if (!response.images_story.data.some((image: any) => image.flag === '3')) {
          this.imageSrc3 = '';
        }
      }
      else {
        this.imageSrc1 = '';
        this.imageSrc2 = '';
        this.imageSrc3 = ''
      }


    });



  }

  obtenerDataTema() {
    const requestData = {
      request: {
        themes_name: "",
        status: true
      },
      order: {
        column: null,
        mode: null
      },
      page_size: 10,
      pgination_key: 1
    };

    this.temas.getDataTema(requestData).subscribe(response => {

      if (response) {

        this.themas = response[0];
        console.log(this.themas)
      }
    });
  }



  onChange(id: string, event: any) {

    this.arr = this.miFormulario.get('temas') as FormArray;
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked && this.groupThemeIds.length >= 3) {
      event.preventDefault(); // Evita que se marque el cuadro de verificación si ya hay tres temas seleccionados
    } else {
      if (isChecked) {
        // arr.push(new FormControl(id));
        this.groupThemeIds.push(Number(id)); // Agrega el mismo valor a groupThemeIds
      }

      else {
        const index = this.arr.controls?.findIndex((x: any) => x.value == id)
        if (index >= 0) {
          this.arr.removeAt(index);
        }

        const groupThemeIndex = this.groupThemeIds.findIndex(item => parseInt(item) === parseInt(id));
        if (groupThemeIndex >= 0) {
          this.groupThemeIds.splice(groupThemeIndex, 1);
        }
      }
      const checkboxes = document.querySelectorAll('.form-check-input') as NodeListOf<HTMLInputElement>;
      checkboxes.forEach(checkbox => {
        const checkboxValue = parseInt(checkbox.value);
        checkbox.disabled = this.groupThemeIds.length >= 3 && !this.groupThemeIds.includes(checkboxValue) && !checkbox.checked;
      });
    }



    console.log('formul' + JSON.stringify(this.miFormulario.value));
    console.log(this.arr.value);
    console.log(this.groupThemeIds);

  }
  // obtenerDetallesMiembros(storyId: number) {
  //   const requestData = {
  //     request: {
  //       story_id: storyId
  //     },
  //     order: {
  //       column: null,
  //       mode: null
  //     },
  //     page_size: 100,
  //     pgination_key: 1
  //   };

  //   this.historiasService.getListaDetalleModeHiStory(requestData).subscribe(response => {
  //     if (response[0]?.data) {
  //       this.historiaMiembros = response[0].data;

  //       console.log(this.historiaMiembros);

  //     }
  //   });
  // }

  calcularDiferenciaFechas(arrivalDate: string) {


    const arrival = new Date(arrivalDate);


    const today = new Date();

    const yearsDiff = today.getFullYear() - arrival.getFullYear();
    const monthsDiff = (yearsDiff * 12) + (today.getMonth() - arrival.getMonth());
    console.log(monthsDiff)
    if (monthsDiff)
      this.diferenciames = monthsDiff
    else
      this.diferenciames = 0

    console.log(this.diferenciames)

  }

  slideContent() {
    const swiper = new Swiper(".slide-content", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      centerSlide: true,
      fade: true,
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      autoplay: {
        delay: 10000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        520: {
          slidesPerView: 1,
        },
        950: {
          slidesPerView: 1,
        },
      },
    });

    $(document).ready(function () {
      $("#mostrar").click(function () {
        $("#mostrar").text($("#mostrar").text() == "Ver más" ? "Ocultar" : "Ver más");
        $('.infoExtra').toggle(1000, function () {


        });
      });
    })

    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl)
    })
  }


  // obtenerHistoriaImages(storyId: number) {
  //   const requestData = {
  //     request: {
  //       id_story: storyId,
  //       status: null
  //     },
  //     order: {
  //       column: null,
  //       mode: null
  //     },
  //     page_size: 100,
  //     pgination_key: 1
  //   };

  //   this.historiasService.getListaImages(requestData).subscribe(response => {
  //     if (response[0]?.data) {
  //       this.historiaImages = response[0].data;

  //       console.log(this.historiaImages);

  //     }
  //   });
  // }

  // obtenerHistoriaReviews(storyId: number) {
  //   const requestData = {
  //     request: {
  //       story_id: storyId,
  //       status: null
  //     },
  //     order: {
  //       column: null,
  //       mode: null
  //     },
  //     page_size: 100,
  //     pgination_key: 1
  //   };

  //   this.historiasService.getListaReviews(requestData).subscribe(response => {
  //     if (response[0]?.data) {
  //       this.historiaReviews = response[0].data;
  //       this.cantidadresenas = response[0].totalElements
  //       console.log(this.cantidadresenas)

  //       console.log(this.historiaReviews);

  //     }
  //   });
  // }

  // obtenerRates() {
  //   const requestData = {
  //     request: {
  //       status: null
  //     },
  //     order: {
  //       column: null,
  //       mode: null
  //     },
  //     page_size: 100,
  //     pgination_key: 1
  //   };

  //   this.historiasService.getListaRates(requestData).subscribe(response => {

  //       this.historiaRates = response[0].data[0];
  //       console.log(this.historiaRates)

  //   });
  // }


  // abrirmodalregistro(){
  //   const modalRegistro= document.getElementById('modalLogin')
  //   if(modalRegistro!=null){
  //     modalRegistro.style.display='block';
  //   }
  //  // setTimeout(() => {
  //   //   this.botonIngresar.nativeElement.click();
  //   // }, 100);
  // }
  abrirmodalregistro(content: any) {
    this.modalService.dismissAll();
    this.modalService.open(content, { backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-basic-Register' }).result.then(
      (result) => {
        // Manejar acciones después de que se cierre la modal (si es necesario).
      },
      (reason) => {
        // Manejar acciones si la modal se cierra de forma inesperada (si es necesario).
      }
    );
  }
  abrirmodallogin() {
    this.modalService.dismissAll();
    //const { temas, fechainicio, fechafin } = this.miFormulario.value;
    // localStorage.setItem('fechainicio', fechainicio);
    // localStorage.setItem('fechafin', fechafin);
    // localStorage.setItem('temas', JSON.stringify(this.groupThemeIds));
    // localStorage.setItem('historia', JSON.stringify(this.historiaDetalle.story.data[0]));
    this.mandarlocalstorage();

    console.log(this.miFormulario.value)
    this.modalService.open(this.modalLogin, { backdrop: 'static', keyboard: false, ariaLabelledBy: 'modalLogin' }).result.then(
      (result) => {

      },
      (reason) => {

      }
    );
  }
  abrirmodalpagos() {
    this.modalService.dismissAll();
    this.modalService.open(this.modalPagos, { backdrop: 'static', keyboard: false, ariaLabelledBy: 'modalLogin' }).result.then(
      (result) => {

      },
      (reason) => {

      }
    );
  }

  login() {
    console.log(this.miFormulario.value)
    const { username, password } = this.miFormularioLogin.value;

    let _req = {
      username: username,
      password: password

    };
    console.log(_req);

    this.authService.login(_req).subscribe((res: any) => {
      console.log(res)
      if (res) {
        if (res[0].roles[0].role_name == 'ROLE_CLIENT') {
          //  const {temas,fechainicio,fechafin } = this.miFormulario.value;
          //   localStorage.setItem('fechainicio', fechainicio);
          //   localStorage.setItem('fechafin', fechafin);
          //   localStorage.setItem('temas', JSON.stringify(this.groupThemeIds));
          this.modalService.dismissAll();
            this.formularioEnviado = false;
            this.textoBoton = 'Registrarse';
            // setTimeout(() => {
              this.router.navigate(['/historias/pagoCita']);
              setTimeout(() => {
                location.reload(); // Recarga la página después de 2 segundos
              }, 1000);
            // }, 2000);



        }
        else if (res[0].roles[0].role_name == 'ROLE_GUIDE') {
          this.router.navigate(['/historias']);
          Swal.fire('Error', 'Eres usuario a nivel guia, tu no puedes adquirir una cita', 'error')
          return
        }

      }
      else {
        console.log(res)
        // this.router.navigate(['/auth/dashboarCliente']);
        Swal.fire('Error', res, 'error')
      }
    },
      (error: any) => {
        console.error('Error:');
        Swal.fire('Error', 'Datos incorrectos', 'error')
      }
    );
    // } else {
    //   console.log('datos incompletos')
    //   console.log(this.req.username);
    //   console.log(this.req.password);
    // }
  }
  registroUsuario() {
    console.log(this.miFormulario.value);
    const {email,password,nombre, apellidos, fechanac, genero, nacionalidad, countrySelect, citySelect,
      fechatentativa,numero,paismigra} = this.miFormularioRegistro.value;

   this.textoBoton = 'Esperando registro';
    this.formularioEnviado = true;

    const fechaNacimiento = new Date(fechanac);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

    if (edad < 18) {
      this.textoBoton = 'Registrarme';
      this.formularioEnviado = false;
      Swal.fire('Error', 'Debes ser mayor de 18 años para registrarte.', 'error');
      return; // Detener el proceso de registro
    }

    const selectedCountry = this.countries.find((option: any) => option.id === countrySelect);
    const codCountry = selectedCountry ? selectedCountry.cod_country : '';

    // Concatena el código de país con el número de teléfono
    const phoneNumber = codCountry + numero.toString();
    //  console.log(this.miFormulario.value);
    // const { email, password } = this.miFormularioRegistro.value;
    // let req = {
    //   request: {
    //     id: 0,
    //     dni: null,
    //     name: null,
    //     lastname: null,
    //     username: email,
    //     password: password,
    //     sexo: null,
    //     photo: null,
    //     status: true,
    //     phone: null,
    //     birth_date: null,
    //     rol: 6

    //   }

    // };

    let req = {
      request: {
        id:0,
        dni:null,
        name:nombre,
        lastname:apellidos,
        username: email,
        password: password,
        sexo:genero,
        photo:null,
        status:true,
        phone:numero.toString(),
        birth_date:fechanac,
        tipo_login:this.tipolog,
        rol:6
      },
      customer: {
        country_id: countrySelect,
        city_id: citySelect,
        nationality_id: nacionalidad,
        social_network: null,
        country_migration: paismigra,
        family_migration:null,
        date_tentative: fechatentativa
      }

    };
    let reqlogin= {
      username: email,
      password: password

    };
    this.authService.registro(req)
      .subscribe(res => {
        console.log(res);
        // console.log(res[0][0].out_rpta);
        if (res.msg === "Usuario registrado") {

          Swal.fire({
            title: 'Registrado',
            text: 'Registro exitoso',
            icon: 'success',
            // timer: 2000,
            // showConfirmButton: false
          }).then(() => {
            this.modalService.dismissAll();
            this.authService.login(reqlogin).subscribe((res: any) => {
              if (res) {
                this.formularioEnviado = false;
                this.textoBoton = 'Registrarse';
                // setTimeout(() => {
                  this.router.navigate(['/historias/pagoCita']);
                  setTimeout(() => {
                    location.reload(); // Recarga la página después de 2 segundos
                  }, 1000);
                // }, 2000);

              }

            },
              (error: any) => {
                this.formularioEnviado = false;
                this.textoBoton = 'Registrarse';
                console.error('Error:');
                Swal.fire('Error', 'Datos incorrectos', 'error')
              }
            );
          });


          // setTimeout(() => {
          //   this.abrirmodallogin();
          // }, 2000);

        }
        else {
          this.formularioEnviado = false;
          this.textoBoton = 'Registrarse';
          console.log(res)
          Swal.fire('Error', "Este usuario ya se encuentra registrado", 'error')

        }
      },
        (error: any) => {
          this.formularioEnviado = false;
          this.textoBoton = 'Registrarse';
          Swal.fire('Error', 'Datos incorrectos', 'error')
        }

      );


  }
  mandarlocalstorage() {
    localStorage.setItem('fechainicio', this.miFormulario.get('fechainicio')?.value);
    localStorage.setItem('fechafin', this.miFormulario.get('fechafin')?.value);
    localStorage.setItem('temas', JSON.stringify(this.groupThemeIds));
    localStorage.setItem('historia', JSON.stringify(this.historiaDetalle.story.data[0]));
    localStorage.setItem('monto', JSON.stringify(this.historiaDetalle.rates[0].price));
    localStorage.setItem('montos', JSON.stringify(this.historiaDetalle.rates[0]));
  }
  // abrirmodal(content: any){

  //     this.modalService.open(content, { ariaLabelledBy: 'modalRegister' }).result.then(
  //       (result) => {
  //         // Manejar acciones después de que se cierre la modal (si es necesario).
  //       },
  //       (reason) => {
  //         // Manejar acciones si la modal se cierra de forma inesperada (si es necesario).
  //       }
  //     );

  // }

  // abrirmodal2(content: any){
  //   this.modalService.dismissAll();
  //   this.modalService.open(content, { ariaLabelledBy: 'modalRegister' }).result.then(
  //     (result) => {
  //       // Manejar acciones después de que se cierre la modal (si es necesario).
  //     },
  //     (reason) => {
  //       // Manejar acciones si la modal se cierra de forma inesperada (si es necesario).
  //     }
  //   );
  // }

  registroCita() {
    const { temas, fechainicio, fechafin } = this.miFormulario.value;

    //console.log(this.miFormulario.value)

    if (!fechainicio || !fechafin) {
      Swal.fire('Error', 'Debes  seleccionar un horario', 'error')
      return
    }
    if (!localStorage.getItem('userdata')) {
      Swal.fire({
        title: 'Alerta',
        text: 'Debes estar logeado para solicitar una cita',
        icon: 'warning',
        timer: 2000, // Establece el tiempo en milisegundos (en este caso, 2 segundos)
        showConfirmButton: false // Oculta el botón de confirmación
      });

      // Espera 2 segundos antes de abrir la modal de login
      setTimeout(() => {
        this.abrirmodallogin();
      }, 2000);

      return;
    }
    if (localStorage.getItem('guia')) {
      Swal.fire('Error', 'Debes registrate como usuario cliente para adquirir una cita', 'error')
      return
    }

    if (this.usuario.name !== null) {
      this.mandarlocalstorage()
      this.modalService.dismissAll();
      this.router.navigate(['/historias/pagoCita']);
    }
    else {
      Swal.fire('Error', 'Debes actualizar tu perfil para solicitar una cita', 'error')
      return
    }
    //this.abrirmodalpagos()

    // let req = {
    //   request: {
    //     booking_id: 0,
    //     story_id: this.storyId,
    //     user_id: this.usuario.id,
    //     time_booking: 60,
    //     price_booking: 90,
    //     startDate_booking: fechainicio,
    //     endDate_booking: fechafin,
    //     link_meeting: "",
    //     payment_method: "Stripe Payment",
    //     reason_cancel: "",
    //     user_cancel_id: this.usuario.id,
    //     in_status: "CREADO",
    //     group_themes: this.groupThemeIds!.map((id: any) => ({
    //       group_theme_id: id,
    //       question: ""
    //     }))

    //   }
    // }
    // console.log(req)
    // this.bookingService.crearBooking(req)
    //   .subscribe(res => {
    //     //  console.log(res[0].in_id);
    //     if (res[0][0].out_rpta === "OK") {
    //       //this.modalClose.nativeElement.click();

    //       Swal.fire('Success', 'Cita registrada', 'success')
    //     } else {
    //       Swal.fire('Error', 'No se pudo registrar', 'error')
    //     }
    //   });


  }


  pay(): void {
    if (this.paymentForm.valid && this.card) {
      const { name, email, amount } = this.paymentForm.value;
      console.log(this.paymentForm.value)
      let historia = this.historiaDetalle.story.data[0].title

      if (localStorage.getItem('historia'))
        historia = localStorage.getItem('historia')

      let req = {

        amount: 90,
        email: this.usuario.username,
        storie: historia

      }

      this.bookingService.createPaymentIntent(req).subscribe((response) => {

        this.stripeService.confirmCardPayment(response[0].client_secret, {
          payment_method: {
            card: this.card.element,
            billing_details: {
              name: this.paymentForm.get('name')?.value,
            },
          },

        }).subscribe((result) => {

          if (result.error) {
            console.error(result.error.message);
            Swal.fire('Error', 'Ocurrio un error al pagar', 'error')
          } else {
            if (result.paymentIntent.status === 'succeeded') {

              console.log('Pago exitoso');
              const { temas, fechainicio, fechafin } = this.miFormulario.value;
              let req = {
                request: {
                  booking_id: 0,
                  story_id: this.storyId,
                  user_id: this.usuario.id,
                  time_booking: 60,
                  price_booking: 90,
                  startDate_booking: fechainicio,
                  endDate_booking: fechafin,
                  link_meeting: "",
                  payment_method: "Stripe Payment",
                  reason_cancel: "",
                  user_cancel_id: this.usuario.id,
                  in_status: "CREADO",
                  group_themes: this.groupThemeIds!.map((id: any) => ({
                    group_theme_id: id,
                    question: ""
                  }))

                }
              }
              console.log(req)
              this.bookingService.crearBooking(req)
                .subscribe(res => {
                  //  console.log(res[0].in_id);
                  if (res[0][0].out_rpta === "OK") {
                    //this.modalClose.nativeElement.click();

                    Swal.fire('Success', 'Cita registrada', 'success')
                  } else {
                    Swal.fire('Error', 'No se pudo registrar', 'error')
                  }
                });


            }
          }
        });
      });
    } else {
      console.log(this.paymentForm);
      console.log(this.card);
    }
  }
  nextSection() {
    if (this.currentSection < 3) {
      this.currentSection++;
    }
    console.log(this.miFormulario.valid)
  }

  prevSection() {
    // if (this.currentSection > 1) {
    //   this.currentSection--;
    // //  this.updateCheckboxState();
    // }
    this.showEventList = true
    // console.log(this.miFormulario.valid)
    this.miFormulario = this.fb.group({
      temas: [this.groupThemeIds],
      fechainicio: '',
      fechafin: ''
    });




  }
  // updateCheckboxState() {
  //   this.checkboxes.forEach(checkbox => {
  //     const id = checkbox.nativeElement.value;
  //     checkbox.nativeElement.checked = this.groupThemeIds.includes(Number(id));
  //   });
  // }
  showCalendarOnly() {
    this.showEventList = false;
    this.showSection3 = true;
  }

  open(content: any, nextModal?: any) {
    // this.groupThemeIds=[]
    let windowClass = '';
    console.log(this.currentSection)
    // if (this.currentSection === 1) {
    //   windowClass = 'modalSeccion1';
    // } else if (this.currentSection === 2) {
    //   windowClass = 'modalSeccion2';
    // }

    this.modalService.open(content, { backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-basic-title', windowClass: 'modalSeccion1' }).result.then((result) => {
      console.log(result)
      this.modalService.open(nextModal);

    }, (reason) => {
      // Acciones si el modal se cierra de otra manera
    });
  }

  cerrarModal() {
    this.limpiar()
    this.modalService.dismissAll();
  }
  limpiar() {
    this.groupThemeIds = []
    this.currentSection = 1
    this.seccion=1;
    this.showEventList = true;
    this.data=undefined;
    this.miFormulario = this.fb.group({
      //abc:['',[Validators.required]],
      temas: [this.groupThemeIds],
      fechainicio: [''],
      fechafin: [''],

    });
    if (localStorage.getItem('fechainicio') || localStorage.getItem('fechafin') || localStorage.getItem('temas') || localStorage.getItem('historia')) {
      localStorage.removeItem('fechainicio');
      localStorage.removeItem('fechafin');
      localStorage.removeItem('temas');
      localStorage.removeItem('historia')
    }
  }

  handleDateSelect(arg: any) {
    this.selectedDate = arg.startStr;
    this.showEventList = false;
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
        status: true,
        flag:1
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


  // handleEventClick(info: any) {

  //   this.selectedDate = info.event.start.toISOString();
  //   this.showCalendarOnly();
  // //  this.currentSection=3;

  //   // ESTO ELIMINA:
  //   // if (confirm(`¿Quieres eliminar el evento? '${clickInfo.event.title}'`)) {

  //   //   let req = {
  //   //     request: {
  //   //       guide_id: this.guiaid,
  //   //       user_id: this.usuario.id,
  //   //       id_availability: clickInfo.event.id,
  //   //       start_date: clickInfo.event.startStr,
  //   //       end_date:  clickInfo.event.endStr,
  //   //       status: false,
  //   //     },
  //   //     order: {
  //   //       column: null,
  //   //       mode: null
  //   //     },
  //   //     page_size: 100,
  //   //     pgination_key: 1
  //   //   }
  //   //   console.log(req)

  //   //   this.disponibleService.crearDisponibilidad(req).subscribe(response => {
  //   //     console.log(response)
  //   //     if (response.msg[0].out_rpta=="OK") {
  //   //       clickInfo.event.remove();
  //   //       this.CargarEvents()
  //   //       Swal.fire('Hecho', 'Se ha eliminado con exito', 'success')

  //   //     }
  //   //    else {
  //   //     Swal.fire('Error', 'No se pudo elimminar', 'error')
  //   //     }
  //   //   });


  //   // }

  // }

  CargarEvents() {
    const fechaActual = new Date();
    const fechaFormateada = `${fechaActual.getFullYear()}-${String(fechaActual.getMonth() + 1).padStart(2, '0')}-${String(fechaActual.getDate()).padStart(2, '0')}`;

    const requestData = {
      request: {
        guide_id: this.guiaid,
        dateNow: fechaFormateada,
        dateRequest: null,
        status: true,
        flag:1
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
          end: item.availability_end_date,

        };
      });
      this.calendarOptions.events = events;
      // this.currentEvents = this.calendarOptions.events;
      //  this.citasRegistradas = events.map((event:any) => event.start);
    });
  }


  getScoreArray(score: string): any[] {
    const numericScore = +score; // Convertimos el string a número
    return Array.from({ length: numericScore });
  }

  logeado() {
    if (!this.authService.estalogeado()) {
      this.estalogeado = false
      console.log(this.usuario)
      console.log(this.rolUsuario)

    }
    else {
      this.estalogeado = true
      this.rolUsuario = this.authService.getRolUsuario();
      this.rolUsuario = this.rolUsuario!.replace(/"/g, '')
      this.GetUsuario();
      //userRole === '"ROLE_CLIENT"'
      console.log(this.usuario)
      console.log(this.rolUsuario)

    }
  }
  setCalificacion(calificacion: number) {
    this.calificacionSeleccionada = calificacion;
    this.miFormularioReview.get('calificacion')?.setValue(calificacion);
  }

  registroReview() {
    const comentario = this.miFormularioReview.get('comentario')?.value;
    const calificacion = this.miFormularioReview.get('calificacion')?.value;
    console.log(this.miFormularioReview)
    console.log(comentario)
    console.log(calificacion)

    if (!this.estalogeado) {
      Swal.fire('Error', "Debes logearte para publicar un comentario", 'error')
      return
    }


    const req = {
      request: {
        review_id: 0,
        story_id: this.historiaDetalle.story.data[0].storie_id,
        user_id: this.usuario.id,
        text_review: comentario,
        score: calificacion,
      },
    }

    this.historiasService.insertarReviews(req).subscribe(
      response => {
        console.log('review:' + JSON.stringify(response));
        if (response[0][0].out_rpta === "OK") {
          Swal.fire('Bien', "Comentario publicado con éxito", 'success')
        }
        else {
          Swal.fire('Error', response[0][0].out_rpta, 'error')
        }


      }


    );

  }
  ocultarpass1() {
    // a=!a;
     this.ocultarpas = !this.ocultarpas;
   }
   sesion(){
    this.modalService.dismissAll();
    this.router.navigate(['/auth/login']);
   }
  //  pasos(){


  //       const navigateToFormStep = (stepNumber: number): void => {
  //         /**
  //         * Hide all form steps.
  //         */

  //         document.querySelectorAll(".form-step").forEach((formStepElement: Element) => {
  //             formStepElement.classList.add("d-none");
  //         });
  //         /**
  //         * Mark all form steps as unfinished.
  //         */
  //         document.querySelectorAll(".form-stepper-list").forEach((formStepHeader: Element) => {
  //             formStepHeader.classList.add("form-stepper-unfinished");
  //             formStepHeader.classList.remove("form-stepper-active", "form-stepper-completed");
  //         });
  //         /**
  //         * Show the current form step (as passed to the function).
  //         */
  //         document.querySelector("#step-" + stepNumber)?.classList.remove("d-none");
  //         /**
  //         * Select the form step circle (progress bar).
  //         */
  //         const formStepCircle = document.querySelector(`li[step="${stepNumber}"]`);
  //         /**
  //         * Mark the current form step as active.
  //         */
  //         formStepCircle?.classList.remove("form-stepper-unfinished", "form-stepper-completed");
  //         formStepCircle?.classList.add("form-stepper-active");
  //         /**
  //         * Loop through each form step circles.
  //         * This loop will continue up to the current step number.
  //         * Example: If the current step is 3,
  //         * then the loop will perform operations for step 1 and 2.
  //         */
  //         for (let index = 0; index < stepNumber; index++) {
  //             /**
  //             * Select the form step circle (progress bar).
  //             */
  //             const formStepCircle = document.querySelector(`li[step="${index}"]`);
  //             /**
  //             * Check if the element exist. If yes, then proceed.
  //             */
  //             if (formStepCircle) {
  //                 /**
  //                 * Mark the form step as completed.
  //                 */
  //                 formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-active");
  //                 formStepCircle.classList.add("form-stepper-completed");
  //             }
  //         }
  //         };
  //         /**
  //         * Select all form navigation buttons, and loop through them.
  //         */
  //         document.querySelectorAll(".btn-navigate-form-step").forEach((formNavigationBtn: Element) => {
  //         /**
  //         * Add a click event listener to the button.
  //         */
  //         formNavigationBtn.addEventListener("click", () => {
  //             /**
  //             * Get the value of the step.
  //             */

  //             const stepNumber = parseInt(formNavigationBtn.getAttribute("step_number") || "0");
  //             /**
  //             * Call the function to navigate to the target form step.
  //             */
  //             navigateToFormStep(stepNumber);
  //         });
  //         });



  //   }
   listaPaises() {
    const requestData = {
      request: {
        contry_name: null,
        status: true,
        flag_tipo: 1
      },
      order: {

        column: null,
        mode: null
      },
      page_size: 200,
      pgination_key: 1
    };

    this.country.getCountries(requestData).subscribe(
      response => {
        this.countries = response[0].data;
        this.paismigra = response[0].data;
        this.options = this.countries.map(country => {
          return {
            id: country.id, // o el campo de identificación correspondiente
            text: country.country_name,
            image: `assets/images/flags/tiny/${country.flag_img}`, // Asegúrate de que las imágenes estén ubicadas correctamente
            cod:country.cod_country
          };
        });
        if (this.options && this.options.length > 0) {
          this.selectedOption = {
            id: this.options[0].id,
            text: this.options[0].text,
            image: this.options[0].image,
            cod:this.options[0].cod
          };
        }
      }

    );
  }
  listaCiudades() {
    if (this.selectedCountryId !== null) {
      const req = {

        request: {
          country_id: this.selectedCountryId,
          city_name: null,
          status: true
        },
        order: {
          column: null,
          mode: null
        },
        page_size: 2000,
        pgination_key: 1

      };

      this.country.getAllCities(req).subscribe(

        response => {
          this.cities = response[0].data;

        }

      )

    }
    else {
      this.cities = [];

    }


  }
  listaNacionalidades() {
    const requestData = {
      request: {
        nationality_name: null,
        status: true
      },
      order: {
        column: null,
        mode: null
      },
      page_size: 100,
      pgination_key: 1
    };

    this.country.getNationalities(requestData).subscribe(
      response => {
        console.log('Nacionalidades=' + JSON.stringify(response));
        this.nationalities = response[0].data;
        //  this.nationalities = response;
        console.log(this.nationalities)

      },
      error => {
        console.error('Error :', error);
      }


    );
  }
  // onCountrySelect(event: any) {
  //   const selectedCountryId = event.target.value;
  //   this.selectedCountryId = selectedCountryId;
  //   this.listaCiudades();
  // }
  // onCitySelect(event: any) {
  //   this.selectedCityId = event.target.value;
  // }

  onCountrySelect(selectedCountryId: number)  {
    // const selectedCountryId = event.target.value;
    this.selectedCountryId = selectedCountryId;
    this.selectedCityId =null;
    this.listaCiudades();
    if(selectedCountryId){
      const selectedCountryop = this.options.find((option:any) => option.id === selectedCountryId);

      if (selectedCountryop) {
        // Actualiza la variable selectedOption con el país seleccionado
        this.selectedOption = {
          id: selectedCountryop.id,
          text: selectedCountryop.text,
          image: selectedCountryop.image,
          cod:selectedCountryop.cod
        };
      }
    }

  }
  onCitySelect(selectedCityId: number) {
    this.selectedCityId = selectedCityId;
  }
  onNationalitySelect(event: any) {
    const selectedNationalityId = event.target.value;
    this.selectedNationalityId = selectedNationalityId
    console.log(this.selectedNationalityId)
  }
  onPaisMigraSelect(event: any) {
    const selectedpaisID = event.target.value;
    this.selectedPaisMigraId = selectedpaisID
    console.log(this.selectedPaisMigraId)
  }
   camposVacios(): boolean {
    const emailControl = this.miFormularioRegistro.get('email');
    const passwordControl = this.miFormularioRegistro.get('password');

    const emailValid = emailControl?.valid && emailControl.value.length >= 5;
    const passwordValid = passwordControl?.valid && passwordControl.value.length >= 6;

    return !emailValid || !passwordValid;
  }

  siguienteSection() {
    this.seccion++;
  }
  onOptionSelect(option: any) {
    // Manejar la opción seleccionada
    this.selectedOption = option;
    console.log('Selected:', option);

    //   this.cdr.detectChanges();

  }
  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]))  //we need payload of the token i.e 2nd part[1],first part is header i.e [0], 3rd part is secret
  }
  handleLogin(resp: any) {
    //resp : u will get credential from that u need to decrypt the
    this.cargando=true;
    if (resp) {

      const payLoad = this.decodeToken(resp.credential);
          this.authService.sendTokenToBackend(resp.credential)
        .subscribe((response:any) => {
          console.log(response);
          console.log(response.error);
          if(response){
            if(response.error){
              let _req = {
                username:payLoad.email ,
                password: ''

              };
              this.authService.login(_req).subscribe((res: any) => {

                if (res) {
                  this.cargando=false
                  this.mandarlocalstorage()
                  this.modalService.dismissAll();
                  this.router.navigate(['/historias/pagoCita']);
                }
                else {
                  this.cargando=false
                  console.log(res)
                  Swal.fire('Error', res, 'error')
                }


              },
              (error: any) => {
                this.cargando=false
                Swal.fire('Error', 'Ha ocurrido un error', 'error')
              }


              );


            }


            else{
              this.cargando=false
              this.abrirmodalRegister()
              this.miFormulario.get('nombre')?.setValue(payLoad.given_name);
              this.miFormulario.get('apellidos')?.setValue(payLoad.family_name);
              this.miFormulario.get('email')?.setValue(payLoad.email);
              this.miFormulario.get('password')?.clearValidators();
              this.miFormulario.get('password')?.updateValueAndValidity();

              this.tipolog = 1;
              this.seccion=2;
            }

          }


      }, error => {
        this.cargando=false
        console.error(error);

      });


    }
  }

  abrirmodalRegister() {
    this.modalService.dismissAll();

    console.log(this.miFormulario.value)
    this.modalService.open(this.modalRegister, { backdrop: 'static', keyboard: false, ariaLabelledBy: 'modalRegister' }).result.then(
      (result) => {

      },
      (reason) => {

      }
    );
  }

  openModalLogin() {
    // this.modalLoginOpened = true;
    // this.modalRegisterOpened = false; // Asegúrate de cerrar el modal de registro al abrir el de login
    this.abrirmodallogin()
  }

  openModalRegister() {

    this.abrirmodalRegister()
  }
  nextseccion(data:any){
   console.log('data emitido:'+data)
  // this.seccion=secc
  console.log(data)
  this.data=data

  }
}

