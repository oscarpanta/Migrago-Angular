import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UneteComponent } from './unete.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path:'',
    component: UneteComponent,
    children:[
      {
        path:'',
       component:MainComponent
      },
      //  {
      //    path:'registroGuia',
      //   component:RegistroGuiaComponent
      // },

      // {
      //   path:'**',
      //   redirectTo:''
      // }

    ]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UneteRoutingModule { }
