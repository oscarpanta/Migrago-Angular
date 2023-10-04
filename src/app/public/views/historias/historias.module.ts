import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { HistoriasRoutingModule } from './historias-routing.module';

import { RouterModule } from '@angular/router';
import { ListadoComponent } from './listado/listado.component';
import { HistoriasComponent } from './historias.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetalleComponent } from './detalle/detalle.component';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';
import { PagoCitaComponent } from './pago-cita/pago-cita.component';




@NgModule({
  declarations: [
    ListadoComponent,

    HistoriasComponent,
     DetalleComponent,
     PagoCitaComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    HistoriasRoutingModule,
    FullCalendarModule,
    NgbModule,
    NgxStripeModule.forRoot(environment.stripe.publicKey),
  ],
  providers:[
    NgbActiveModal,
    DatePipe
  ],
  exports:[RouterModule]
})
export class HistoriasModule { }
