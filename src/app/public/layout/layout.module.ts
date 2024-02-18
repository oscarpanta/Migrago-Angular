import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ContenidoComponent } from './components/contenido/contenido.component';

import { RegistroModalComponent } from './components/registro-modal/registro-modal.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotZeroDirective } from 'src/app/core/directives/not-zero.directive';
import { CoreModule } from 'src/app/core/core.module';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    ContenidoComponent,
    FooterComponent,
    HeaderComponent,
    RegistroModalComponent,
    // NotZeroDirective

  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbModule,
    CoreModule
  ],
  exports:[
    ContenidoComponent
  ],
  providers:[
    NgbActiveModal
  ]
})
export class LayoutModule { }
