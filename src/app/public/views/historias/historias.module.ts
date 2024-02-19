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
import { NgbActiveModal, NgbModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';
import { PagoCitaComponent } from './pago-cita/pago-cita.component';
import { CoreModule } from 'src/app/core/core.module';
import { ModalComponent } from '../home/modal/modal.component';
import { HomeModule } from '../home/home.module';
import { ModalRegistroComponent } from './detalle/modal-registro/modal-registro.component';
import { ModalLoginComponent } from './detalle/modal-login/modal-login.component';





@NgModule({
  declarations: [
    ListadoComponent,

    HistoriasComponent,
     DetalleComponent,
     PagoCitaComponent,
     ModalRegistroComponent,
     ModalLoginComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    HistoriasRoutingModule,
    CoreModule,
    FullCalendarModule,
    NgbModule,
    NgbProgressbarModule,
    NgxStripeModule.forRoot(environment.stripe.publicKey),
    HomeModule
  ],
  providers:[
    NgbActiveModal,
    DatePipe
  ],
  exports:[RouterModule]
})
export class HistoriasModule { }
