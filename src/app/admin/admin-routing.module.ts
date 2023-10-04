import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/auth/login/login.component';
import { AdminComponent } from './admin.component';


const routes: Routes = [
{
  path: '',
  component: AdminComponent,
  children: [
    {
      path: 'login', component: LoginComponent,
      //canActivate: [IntentoLoginGuard],
      // {path:'registro',component:RegisterComponent},
    },
    {
      path: 'dashboard',
      loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
      //canActivate:[ValidarTokenGuard],

    },
    {
      path: '**',
      redirectTo: 'login',
      pathMatch: 'full',
  }
  ]
}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
