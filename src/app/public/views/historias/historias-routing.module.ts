import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ListadoComponent } from './listado/listado.component';
import { HistoriasComponent } from './historias.component';
import { DetalleComponent } from './detalle/detalle.component';
import { PagoCitaComponent } from './pago-cita/pago-cita.component';
import { PagoGuard } from 'src/app/core/guard/pago.guard';


const routes: Routes = [
  {
    path:'',
    component: HistoriasComponent,
    children:[
      {
        path:'listado',
        component:ListadoComponent
     },
     {
      path:'detalle',
      component:DetalleComponent
   },
   {
    path:'pagoCita',
    component:PagoCitaComponent,
    canActivate: [PagoGuard],
    //Canactivate
 },


     {
      path:'**',
      redirectTo:'listado'
   }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoriasRoutingModule { }
