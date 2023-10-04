var swiper = new Swiper(".slide-content", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    autoplay: {
        delay: 10000,
        //   pauseOnMouseEnter: true,
          disableOnInteraction: false,
        },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    
    breakpoints:{
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

$( document ).ready(function() {
    $("#mostrar").click(function(){
        $("#mostrar").text($("#mostrar").text()== "Ver más" ? "Ocultar" : "Ver más") ;
        $('.infoExtra').toggle(1000,function() {
           

        });
    });
})