import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { ValidarTokenGuard } from 'src/app/core/guard/validar-token.guard';
import { ValidartokenGuiaGuard } from 'src/app/core/guard/validartoken-guia.guard';
import { IntentoLoginGuard } from 'src/app/core/guard/intento-login.guard';
import { ReagendarComponent } from './reagendar/reagendar.component';
import { ReagendarGuard } from 'src/app/core/guard/reagendar.guard';



const routes: Routes = [
  {
    path:'',
    component: MainComponent,
    children:[
      {path:'login',component:LoginComponent,
      canActivate: [IntentoLoginGuard],
     // {path:'registro',component:RegisterComponent},
      } ,
     {
      path:'dashboardCliente',
      loadChildren:()=>import('./dashboard/cliente/cliente.module').then(m=>m.ClienteModule),
      canActivate:[ValidarTokenGuard],
      // canLoad:[ValidarTokenGuard]
    },
    {
      path:'dashboardGuia',
      loadChildren:()=>import('./dashboard/guia/guia.module').then(m=>m.GuiaModule),
       canActivate:[ValidartokenGuiaGuard]
      // canLoad:[ValidarTokenGuard]
    },
    {
      path:'reagendar', component:ReagendarComponent,
      canActivate:[ReagendarGuard]
      // canActivate:[ValidartokenGuiaGuard]

    },
      {path:'**', redirectTo:'login'},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
