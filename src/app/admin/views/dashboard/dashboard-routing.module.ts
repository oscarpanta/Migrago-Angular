import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { MainComponent } from './containers/main/main.component';
import { GuiaComponent } from './containers/guia/guia.component';
import { SBRouteData } from '../../navigation/models/navigation.model';

const routes: Routes = [
{
  path: '',
  component: DashboardComponent,
  children: [
    {
      path: '',
      component: MainComponent
    },
    {
      path: 'Guia', component: GuiaComponent,
      data: {
        title: 'Table Guia',
        breadcrumbs: [
          {
            text: 'Dashboard',
            link: '/dashboard',
          },
          {
            text: 'Tabla de Guia',
            active: true,
          },
        ],
      } as SBRouteData,
    },
    { path: '**', redirectTo: 'Guia' },

  ],
  canActivate: [],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
