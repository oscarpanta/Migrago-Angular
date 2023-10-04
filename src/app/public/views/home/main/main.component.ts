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
declare var $: any;
//import * as $ from 'jquery';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})



export class MainComponent implements OnInit,AfterViewInit{
  @ViewChild('modalRegister') miModal: ElementRef | undefined
  rutasmigracion:WayMigration[]=[];
  usuario!: Usuario;
  //historias:Stories[]=[]
  //resp_historias:ResponseStories[]=[]
  //resp_historias:DataStories[]=[]
  resp_historias:any[]=[]

  estalogeado : boolean = false;
  rolUsuario : string |null ="";
 // private swiper!:Swiper;

  constructor(private router: Router,private elRef:ElementRef, private modalService: NgbModal,
              private displayService: LayoutService,
              private heroesService: HeroeService,
              private rutamigracionService: WaysMigrationService,
              private historiasService:StoriesService,
              private authService:AutenticacionService ) {

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
    this.cargarheroes();
    this.listaRutasMigracion();
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

  cargarheroes() {
    // this.heroesService.getHeroes().subscribe(
    //   heroes => {
    //     this.heroes = heroes
    //   }
    // )
    // this.httpCoreService.get('/heroes/').subscribe(
    //   heroes => {
    //     this.heroes = heroes
    //   }
    // )

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
     }


    );

  }

  GetUsuario(){
    //this.usuario =  this.authService.usuario;
    this.usuario = this.authService.getUsuario();
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
    else{
      this.estalogeado=true
      this.rolUsuario =this.authService.getRolUsuario();
      this.rolUsuario = this.rolUsuario!.replace(/"/g, '')
      this.GetUsuario();
      console.log(this.usuario)

    }
  }
  logout(){
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }

}
