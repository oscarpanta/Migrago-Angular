import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuiaRoutingModule } from './guia-routing.module';
import { GuiaComponent } from './guia.component';
import { AgendaComponent } from './agenda/agenda.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoriasComponent } from './historias/historias.component';
import { CambiarContrasenaGuiaComponent } from './cambiar-contrasena-guia/cambiar-contrasena-guia.component';
import { PerfilGuiaComponent } from './perfil-guia/perfil-guia.component';
import { AgendadasGuiaComponent } from './agendadas-guia/agendadas-guia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ModalComponent } from './agenda/modal/modal.component';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { NgSelectModule } from '@ng-select/ng-select';
//import { ReplaceSlashPipePipe } from 'src/app/core/pipes/replace-slash-pipe.pipe';

//import { Select2Module } from 'ng2-select2';



@NgModule({
  declarations: [
    GuiaComponent,
    AgendaComponent,
    DashboardComponent,
    HistoriasComponent,
    CambiarContrasenaGuiaComponent,
    PerfilGuiaComponent,
    AgendadasGuiaComponent,
    ModalComponent,
   // ReplaceSlashPipePipe


  ],
  imports: [
   // Select2Module,
    CommonModule,
    FormsModule,
    GuiaRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    FullCalendarModule,
    PipesModule,
    NgSelectModule,




  ]
})
export class GuiaModule { }
