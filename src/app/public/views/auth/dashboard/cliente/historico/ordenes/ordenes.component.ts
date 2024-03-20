import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import { DateService } from 'src/app/core/utils/date.service';
import { BookingsService } from 'src/app/public/views/services/bookings.service';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent implements OnInit {

  agendadasCliente: any[] = [];
 // agendadaSeleccionada: any;
  idcliente:any;
  constructor(private agendadasService: BookingsService, private authService: AutenticacionService,private fechaservice:DateService) {}
  ngOnInit(): void {
    this.GetClienteId()
    this.listaAgendadasGuia()
  }



  GetClienteId() {
      this.idcliente = this.authService.getCliente()?.trim();
      this.idcliente = Number(this.idcliente.replace(/[^0-9]/g, ''));

  }

  listaAgendadasGuia() {
    const requestData = {
      request: {
        booking_id:null,
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
        console.log('agendadas=' + JSON.stringify(response));
        this.agendadasCliente= response[0].data;
        this.agendadasCliente[0].booking_start_date=this.fechaservice.formatDatetimeToString(this.agendadasCliente[0].booking_start_date)

        console.log(this.agendadasCliente)

      }


    );

  }



}
