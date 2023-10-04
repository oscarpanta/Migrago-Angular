import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricoRoutingModule } from './historico-routing.module';
import { HistoricoComponent } from './historico.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { DetalleComponent } from './detalle/detalle.component';


@NgModule({
  declarations: [
    HistoricoComponent,
    OrdenesComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    HistoricoRoutingModule
  ]
})
export class HistoricoModule { }
