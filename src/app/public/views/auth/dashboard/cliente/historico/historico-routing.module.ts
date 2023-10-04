import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoricoComponent } from './historico.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { DetalleComponent } from './detalle/detalle.component';

const routes: Routes = [

  {
    path: '',
    component: HistoricoComponent,
    children: [
      {
        path: 'ordenes',
        component: OrdenesComponent
      },

      {
        path: 'detalle',
        component: DetalleComponent
      },

      {
        path: '**',
        redirectTo: 'ordenes'
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoricoRoutingModule { }
