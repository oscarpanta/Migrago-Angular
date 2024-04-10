import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import Swiper from 'swiper';
import { LayoutService } from 'src/app/public/layout/layout.service';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroeService } from '../../services/heroe.service';
import { WaysMigrationService } from '../../services/ways-migration.service';
import { WayMigration } from '../../interfaces/waymigration.interface';
import { StoriesService } from '../../services/stories.service';
import { DataStories, ResponseStories, Stories } from '../../interfaces/stories.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import { Usuario } from 'src/app/core/interfaces/login.interface';
import { environment } from 'src/environments/environment';
import { TemasService } from '../../services/temas.service';
import { ImagenesService } from '../../services/imagenes.service';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/countries.interface';
declare var $: any;
//import * as $ from 'jquery';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})



export class MainComponent implements OnInit,AfterViewInit{
  @ViewChild('modalRegister') miModal: ElementRef | undefined

  selectedCountryId: number | null = null;
  countries: Country[] = []

  rutasmigracion:WayMigration[]=[];
  usuario!: Usuario;
  //historias:Stories[]=[]
  //resp_historias:ResponseStories[]=[]
  //resp_historias:DataStories[]=[]
  resp_historias:any[]=[]
  Temas:any[]=[]
  estalogeado : boolean = false;
  rolUsuario : string |null ="";
 // private swiper!:Swiper;

  constructor(private router: Router,private elRef:ElementRef, private modalService: NgbModal,
              private displayService: LayoutService, private country: CountriesService,
              private heroesService: HeroeService,
              private rutamigracionService: WaysMigrationService,
              private historiasService:StoriesService,
              private authService:AutenticacionService,private temasService:TemasService,private imagenservice: ImagenesService ) {

              }
  ngAfterViewInit(): void {
    this.slideContent();
  }

  ngOnInit(): void {
    const url = environment.baseUrl
    console.log(url)
    const nav = document.getElementById("navbar")!
    const butIngresa = document.getElementById("ingresa")!;
    // const nav = document.querySelector(".nav")! as HTMLElement;
    //const navlink = document.querySelectorAll(".nav-link")!;


    window.onscroll = function () { scrollFunction() };
    function scrollFunction() {
      if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {

        nav.classList.add("navScroll");


      } else {

        nav.classList.remove("navScroll");
      }
    }
    this.displayService.setNavigationVisibility(false);
    this.listaPaises();
    this.listaRutasMigracion();
    this.obtenerDataTema()
    this.listaHistorias();
    console.log(this.rolUsuario)
    this.logeado();
  }

  ngOnDestroy(): void {
    this.displayService.setNavigationVisibility(true);
  }

  // historias(){
  //   this.router.navigate(['historias']);
  // }
  slideContent() {
    setTimeout(() => {
      const swiper1Element = document.querySelector(".slide-content");
      const swiper2Element = document.querySelector(".slide-content2");
      const swiper3Element = document.querySelector(".slide-content3");

      if (swiper1Element && swiper2Element && swiper3Element) {
        //slider1
       // this.swiper = new Swiper(this.elRef.nativeElement.querySelector('.slide-content'),{
          const swiper = new Swiper(".slide-content", {
          slidesPerView: 3,
          spaceBetween: 30,
          loop: true,
          centeredSlides: true,
          fadeEffect: {
            crossFade: true
          },
          grabCursor: true, // Valor booleano correcto
          // pagination: {
          //   el: ".swiper-pagination",
          //   clickable: true,
          //   dynamicBullets: true,
          // },
          autoplay: {
            delay: 10000,
            //   pauseOnMouseEnter: true,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            disabledClass: 'swiper-button-disabled',
          },

          breakpoints: {
            0: {
              slidesPerView: 1,
            },
            520: {
              slidesPerView: 2,
            },
            950: {
              slidesPerView: 3,
            },
          },
        });
        //slider 2
        const swiper2 = new Swiper(".slide-content2", {
          slidesPerView: 3,
          spaceBetween: 30,
          loop: true,
          centeredSlides: true,
          fadeEffect: {
            crossFade: true
          },
          grabCursor: true,
          // pagination: {
          //   el: ".swiper-pagination",
          //   clickable: true,
          //   dynamicBullets: true,
          // },
          autoplay: {
            delay: 10000,
            //   pauseOnMouseEnter: true,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            disabledClass: 'swiper-button-disabled',
          },



          breakpoints: {
            0: {
              slidesPerView: 1,
            },
            520: {
              slidesPerView: 2,
            },
            950: {
              slidesPerView: 3,
            },
          },
        });
        //slider 3 - reseñas de migrantes
        const swiper3 = new Swiper(".slide-content3", {
          slidesPerView: 1,
          // spaceBetween: 30,
          loop: true,
          centeredSlides: true,
          fadeEffect: {
            crossFade: true
          },
          grabCursor: true,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
            // dynamicBullets: true,
          },
          autoplay: {
            delay: 3000,
            //   pauseOnMouseEnter: true,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            disabledClass: 'swiper-button-disabled',
          },
          effect: 'fade',
          // fadeEffect: {
          //   crossFade: true
          // },


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

      }

    }, 500);



  }
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
        console.log('Paises=' + JSON.stringify(response));
        this.countries = response[0].data;
        console.log(this.countries)
        // console.log('obtenido='+this.countries.id)

      }


      // (response) => {
      //   console.log('Response:', response);
      //   // Aquí puedes manejar la respuesta como desees
      // },
      // (error) => {
      //   console.error('Error:', error);
      //   // Aquí puedes manejar el error
      // }
    );
  }
  onCountrySelect(selectedCountryId: number) {

    this.selectedCountryId = selectedCountryId;
  }
  listaRutasMigracion(){
    const requestData = {
      request: {
        waymigration_name: null,
        status: true
      },
      order: {

        column: null,
        mode: null
      },
      page_size: 100,
      pgination_key: 1
    };

    this.rutamigracionService.getWayMigrations(requestData).subscribe(
      response => {
        this.rutasmigracion = response[0].data;
     }


    );
  }



  listaHistorias(){

    const requestData = {
      request: {
        id_country: 0,
        id_city:0,
        id_nationality:0,
        id_way_migration:0,
        id_migration_mode:"",
        id_group_themes:"",
        status: "APROBADO"
      },
      order: {
        column: null,
        mode: null
      },
      page_size: 100,
      pgination_key: 1
    };

    this.historiasService.getStories(requestData).subscribe(
      response => {
        console.log('hist' + JSON.stringify(response));
        this.resp_historias = response[0].data;

        console.log(this.resp_historias)
        this.resp_historias.forEach(historia => {
          if (historia.photo) {
            historia.urlImagen = this.imagenservice.getImageUrlUser(historia.photo);
          }else{
            historia.urlImagen = 'assets/images/perfiles/profile1.jpg';
          }

          // Obtener la URL de la imagen

          console.log(historia.urlImagen)
        });
        this.resp_historias.forEach(historia => {
          if (historia.image_story.image_story) {
            historia.urlImagenStory = this.imagenservice.getImageUrlHistoria(historia.image_story.image_story);
          }else{
            historia.urlImagenStory = 'assets/images/imagen_prueba.png';
          }



          console.log(historia.urlImagenStory)
        });

     }


    );

  }

  GetUsuario(){
    //this.usuario = this.authService.getUsuario();
    this.authService.getUsuario().subscribe((usuario:any) => {
      this.usuario = usuario;
      console.log(this.usuario);
    });
  }
  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modalRegister' }).result.then(
      (result) => {
        // Manejar acciones después de que se cierre la modal (si es necesario).
      },
      (reason) => {
        // Manejar acciones si la modal se cierra de forma inesperada (si es necesario).
      }
    );
  }
  cerrarModal() {
    this.modalService.dismissAll();

  }
  logeado(){
    if(!this.authService.estalogeado()){
      this.estalogeado=false

    }
    else
    {
      this.rolUsuario =this.authService.getRolUsuario();
      this.rolUsuario = this.rolUsuario!.replace(/"/g, '')
      if (this.rolUsuario==='ROLE_ADMIN'){
        this.estalogeado=false
        return
      }
      this.estalogeado=true
      // this.rolUsuario =this.authService.getRolUsuario();
      // this.rolUsuario = this.rolUsuario!.replace(/"/g, '')
      this.GetUsuario();
      console.log(this.rolUsuario)

    }
  }
  // logeado(){
  //   if(!this.authService.estalogeado()){
  //     this.estalogeado=false

  //   }
  //   else{
  //     this.estalogeado=true
  //     this.rolUsuario =this.authService.getRolUsuario();
  //     this.rolUsuario = this.rolUsuario!.replace(/"/g, '')
  //     this.GetUsuario();
  //     console.log(this.usuario)

  //   }
  // }
  logout(){
    this.router.navigateByUrl('/auth');
    this.authService.logout();
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

    this.temasService.getDataTema(requestData).subscribe(response => {

      if (response) {

        this.Temas = response[0];
        console.log(this.Temas)
        console.log(this.Temas[0].details.data)
        console.log(this.Temas[0].images.data)
      }
    });
  }
  formatDescriptionThemes(detailsData: any[]): string {
    const themes = detailsData.map((detail) => detail.description_theme);

    if (themes.length === 1) {
      return themes[0];
    } else if (themes.length === 2) {
      return themes.join(' y ');
    } else {
      const lastTheme = themes.pop(); // Remover el último tema
      return themes.join(', ') + ' y ' + lastTheme;
    }
  }
  redirectToListado(selectedCountryId: number | null) {
    this.router.navigate(['/historias/listado'], { queryParams: { countryId: selectedCountryId } });
  }

}
