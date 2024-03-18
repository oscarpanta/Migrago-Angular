import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { DetalleComponent } from './detalle/detalle.component';
import { ListadoComponent } from './listado/listado.component';

const routes: Routes = [
  {
    path:'',
    component: BlogComponent,
    children:[
      {
        path:'',
        component:ListadoComponent
    },
      {
        path:'detalle',
        component:DetalleComponent
    },
     {
      path:'**',
      redirectTo:''
   },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
