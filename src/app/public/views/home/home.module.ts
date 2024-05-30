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
// import { NgxSummernoteModule } from 'ngx-summernote';
import { NotZeroDirective } from 'src/app/core/directives/not-zero.directive';
import { CoreModule } from 'src/app/core/core.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { PipesModule } from 'src/app/core/pipes/pipes.module';



@NgModule({
  declarations: [

    HomeComponent,
     TarjetaComponent,
     RegistroGuiaComponent,
     MainComponent,
    ModalComponent,
    NosotrosComponent,
    // NotZeroDirective

  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
   // NgbModalModule
  //  NgxSummernoteModule,
   CoreModule,
   PipesModule


  ],
  exports: [
    RouterModule,
    ModalComponent

  ],
  providers:[
    NgbActiveModal
  ]
})
export class HomeModule { }
