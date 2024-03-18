import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { MainComponent } from './containers/main/main.component';
import { GuiaComponent } from './containers/guia/guia.component';
import { SBRouteData } from '../../navigation/models/navigation.model';
import { PaisComponent } from './containers/pais/pais.component';
import { HistoriaComponent } from './containers/historia/historia.component';
import { BlogComponent } from './containers/blog/blog.component';

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
      path: 'pais', component: PaisComponent,
      data: {
        title: 'Dashboard Static - SB Admin Angular',
        breadcrumbs: [
          {
            text: 'Dashboard',
            link: '/dashboard',
          },
          {
            text: 'Tabla de pais',
            active: true,
          },
        ],
      } as SBRouteData,
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
    {
      path: 'historia', component: HistoriaComponent,
      data: {
        title: 'Tabla de Historias',
        breadcrumbs: [
          {
            text: 'Dashboard',
            link: '/dashboard',
          },
          {
            text: 'Tabla de Historias',
            active: true,
          },
        ],
      } as SBRouteData,
    },
    {
      path: 'blog', component: BlogComponent,
      data: {
        title: 'Table de Blogs',
        breadcrumbs: [
          {
            text: 'Dashboard',
            link: '/dashboard',
          },
          {
            text: 'Tabla de Blogs',
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
