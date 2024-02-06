import { Component, ElementRef, OnInit } from '@angular/core';
import { Chart, ChartItem, TimeScale, TimeScaleTickOptions, registerables } from 'chart.js';
import { Usuario } from 'src/app/core/interfaces/login.interface';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  myChart: any;
  usuario! : Usuario
  constructor(private elementRef: ElementRef,private authService:AutenticacionService) {

  }

  ngOnInit(): void {

    this.mostrarChart();
    this.GetUsuario()
  }
  GetUsuario(){
   //this.usuario = this.authService.getUsuario();
   this.authService.getUsuario().subscribe((usuario:any) => {
    this.usuario = usuario;
    console.log(this.usuario);
  });
  }
  mostrarChart() {
    // const $grafica: HTMLElement | null = document.querySelector("#myChart");
    // Las etiquetas son las que van en el eje X.
    const etiquetas: string[] = ["Enero", "Febrero", "Marzo", "Abril"]
    // Podemos tener varios conjuntos de datos. Comencemos con uno
    const datosVentas2020 = {
      label: "Ventas por mes",
      data: [5000, 1500, 8000, 5102], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
      backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo
      borderColor: 'rgba(54, 162, 235, 1)', // Color del borde
      borderWidth: 1,// Ancho del borde

    };
    Chart.register(...registerables);
    const $grafica = this.elementRef.nativeElement.querySelector(`#myChart`);

    new Chart($grafica, {
      type: 'line',// Tipo de gráfica
      data: {
        labels: etiquetas,
        datasets: [
          datosVentas2020,
          // Aquí más datos...
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });



  }
  // chartit() {
  //   Chart.register(...registerables);
  //   let htmlRef = this.elementRef.nativeElement.querySelector(`#myChart`);
  //   this.myChart = new Chart(htmlRef, {
  //     type: 'bar',
  //     data: {
  //       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //       datasets: [{
  //         label: '# of Votes',
  //         data: [12, 19, 3, 5, 2, 3],
  //         backgroundColor: [
  //           'rgba(255, 99, 132, 0.2)',
  //           'rgba(54, 162, 235, 0.2)',
  //           'rgba(255, 206, 86, 0.2)',
  //           'rgba(75, 192, 192, 0.2)',
  //           'rgba(153, 102, 255, 0.2)',
  //           'rgba(255, 159, 64, 0.2)'
  //         ],
  //         borderColor: [
  //           'rgba(255, 99, 132, 1)',
  //           'rgba(54, 162, 235, 1)',
  //           'rgba(255, 206, 86, 1)',
  //           'rgba(75, 192, 192, 1)',
  //           'rgba(153, 102, 255, 1)',
  //           'rgba(255, 159, 64, 1)'
  //         ],
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true
  //         }
  //       }
  //     }
  //   });
  // }
}


