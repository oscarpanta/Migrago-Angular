import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuiaComponent } from './guia.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoriasComponent } from './historias/historias.component';
import { AgendaComponent } from './agenda/agenda.component';
import { AgendadasGuiaComponent } from './agendadas-guia/agendadas-guia.component';
import { PerfilGuiaComponent } from './perfil-guia/perfil-guia.component';
import { CambiarContrasenaGuiaComponent } from './cambiar-contrasena-guia/cambiar-contrasena-guia.component';

const routes: Routes = [


  {
    path: '',
    component: GuiaComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'historias',
        component: HistoriasComponent
      },
      {
        path: 'agenda',
        component: AgendaComponent
      },
      {
        path: 'agendadas',
        component: AgendadasGuiaComponent
      },

      {
        path: 'perfil',
        component: PerfilGuiaComponent
      },
      {
        path:'cambiar',
        component:CambiarContrasenaGuiaComponent
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuiaRoutingModule { }
