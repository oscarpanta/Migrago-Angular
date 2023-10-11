import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardChartsComponent } from './components/dashboard-charts/dashboard-charts.component';
import { SortIconComponent } from './components/sort-icon/sort-icon.component';
import { MainComponent } from './containers/main/main.component';
import { GuiaComponent } from './containers/guia/guia.component';
import { HistoriaComponent } from './containers/historia/historia.component';
import { CustomMinTableDirective } from 'src/app/core/directives/custom-min-table.directive';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationModule } from '../../navigation/navigation.module';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataGuiaComponent } from './containers/guia/data-guia/data-guia.component';
import { DataHistoriaComponent } from './containers/historia/data-historia/data-historia.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { PaisComponent } from './containers/pais/pais.component';


@NgModule({
  declarations: [
    DashboardChartsComponent,

    SortIconComponent,
    MainComponent,
    GuiaComponent,
    HistoriaComponent,
    CustomMinTableDirective,
    DataGuiaComponent,
    DataHistoriaComponent,
    DashboardComponent,
    PaisComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NavigationModule,
    RouterModule,
    DashboardRoutingModule,
    NgbModule
  ],
  providers:[
    NgbActiveModal
  ]
})
export class DashboardModule { }
