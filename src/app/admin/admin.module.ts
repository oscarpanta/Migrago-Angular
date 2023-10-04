import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { LoginComponent } from './views/auth/login/login.component';
import { AdminComponent } from './admin.component';



@NgModule({
  declarations: [

    LoginComponent,
     AdminComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
