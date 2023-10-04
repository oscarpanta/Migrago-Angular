import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemasRoutingModule } from './temas-routing.module';
import { TemasComponent } from './temas.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    TemasComponent
  ],
  imports: [
    CommonModule,
    TemasRoutingModule,
    NgbModule
  ]
})
export class TemasModule { }
