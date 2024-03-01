import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {
 // showSwiper!: boolean;
 private swiperInstance: Swiper | null = null;
  constructor(private cdRef: ChangeDetectorRef) { }
  ngAfterViewInit(): void {

    this.swiper();
    this.cdRef.detectChanges();
  }
  ngOnInit(): void {
    //this.showSwiper = true;
  }

  swiper() {

    setTimeout(() => {
      if (this.swiperInstance) {
        this.swiperInstance.destroy();
      }



          // const swiper = new Swiper(".slide-content3", {
          //   slidesPerView: 1,
          //   // spaceBetween: 30,
          //   loop: true,
          //   centeredSlides: true,
          //   // fade: true,
          //   grabCursor: true,
          //   pagination: {
          //     el: ".swiper-pagination",
          //     clickable: true,
          //     // dynamicBullets: true,
          //   },
          //   autoplay: {
          //     delay: 1000000,
          //     //   pauseOnMouseEnter: true,
          //     disableOnInteraction: false,
          //   },
          //   navigation: {
          //     nextEl: ".swiper-button-next",
          //     prevEl: ".swiper-button-prev",
          //     disabledClass: 'swiper-button-disabled'
          //   },
          //   //effect: 'fade',
          //   fadeEffect: {
          //     crossFade: true
          //   },


          //   breakpoints: {
          //     0: {
          //       slidesPerView: 1,
          //     },
          //     520: {
          //       slidesPerView: 1,
          //     },
          //     950: {
          //       slidesPerView: 1,
          //     },
          //   },
          // });
          this.swiperInstance = new Swiper(".slide-content3", {
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



      //slider 3 - reseñas de migrantes
    }, 100);



  }

}
