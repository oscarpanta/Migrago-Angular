import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

//import { CommonModule } from '@angular/common';
import { RegistroGuiaComponent } from './registro-guia/registro-guia.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { MainComponent } from './main/main.component';
import { NosotrosComponent } from './nosotros/nosotros.component';

const routes: Routes=[
  {
    path:'',
    component: HomeComponent,
    children:[
      {
        path:'',
       component:MainComponent
     },
       {
         path:'registroGuia',
        component:RegistroGuiaComponent
      },
      {
        path:'nosotros',
       component:NosotrosComponent
     },

      {
        path:'**',
        redirectTo:''
      }

    ]

  }
]

@NgModule({

  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class HomeRoutingModule { }
