import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { NgbActiveModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistroGuiaComponent } from './registro-guia/registro-guia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { ModalComponent } from './modal/modal.component';
import { NosotrosComponent } from './nosotros/nosotros.component';




@NgModule({
  declarations: [

    HomeComponent,
     TarjetaComponent,
     RegistroGuiaComponent,
     MainComponent,
    ModalComponent,
    NosotrosComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    NgbModule,
   // NgbModalModule


  ],
  exports: [
    RouterModule,

  ],
  providers:[
    NgbActiveModal
  ]
})
export class HomeModule { }
