import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetalleComponent } from './detalle/detalle.component';
import { ListadoComponent } from './listado/listado.component';


@NgModule({
  declarations: [
    BlogComponent,
    DetalleComponent,
    ListadoComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    NgbModule
  ]
})
export class BlogModule { }
