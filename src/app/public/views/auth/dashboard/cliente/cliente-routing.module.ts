import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente.component';
import { AgendadasComponent } from './agendadas/agendadas.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CambiarContrasenaComponent } from './cambiar-contrasena/cambiar-contrasena.component';

const routes: Routes = [

  {
    path: '',
    component: ClienteComponent,
    children: [
      {
        path: 'agendadas',
        component: AgendadasComponent
      },
      {
        path: 'historico',
        loadChildren:()=>import('./historico/historico.module').then(m=>m.HistoricoModule),
      },
      {
        path: 'perfil',
        component: PerfilComponent
      },
      {
        path:'cambiar',
        component:CambiarContrasenaComponent
      },
      {
        path: '**',
        redirectTo: 'agendadas'
      }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
