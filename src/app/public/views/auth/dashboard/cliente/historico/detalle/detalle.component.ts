import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import { BookingsService } from 'src/app/public/views/services/bookings.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  citaid!:number
  idcliente:any
  agendadasCliente:any[] = [];
  constructor(private route: ActivatedRoute, private agendadasService: BookingsService,private authService:AutenticacionService) { }


  ngOnInit(): void {
    this.GetClienteId()
    this.route.queryParams.subscribe(params => {
      this.citaid = params['cita_id'];
      if (this.citaid) {
        this.obtenerDetalleAgendada(this. citaid);
      }
    });



  }
  GetClienteId() {
    this.idcliente = this.authService.getCliente()?.trim();
    this.idcliente = Number(this.idcliente.replace(/[^0-9]/g, ''));

}
  obtenerDetalleAgendada(citaId:number) {
    const requestData = {
      request: {
        booking_id:citaId,
        customer_id:this.idcliente,
        guide_id:null,
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
        console.log('agendadas detalle=' + JSON.stringify(response));
        this.agendadasCliente= response[0].data;

        console.log(this.agendadasCliente)

      }
    );

   }
}
