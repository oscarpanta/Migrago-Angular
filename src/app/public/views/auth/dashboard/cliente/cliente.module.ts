import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CambiarContrasenaComponent } from './cambiar-contrasena/cambiar-contrasena.component';
import { HistoricoComponent } from './historico/historico.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AgendadasComponent } from './agendadas/agendadas.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    ClienteComponent,
    AgendadasComponent,
    CambiarContrasenaComponent,
    //HistoricoComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClienteRoutingModule,
    NgSelectModule

  ]
})
export class ClienteModule { }
