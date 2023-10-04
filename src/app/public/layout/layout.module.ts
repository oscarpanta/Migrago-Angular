import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ContenidoComponent } from './components/contenido/contenido.component';

import { RegistroModalComponent } from './components/registro-modal/registro-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ContenidoComponent,
    FooterComponent,
    HeaderComponent,
    RegistroModalComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports:[
    ContenidoComponent
  ],
  providers:[
    NgbActiveModal
  ]
})
export class LayoutModule { }
