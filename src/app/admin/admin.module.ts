import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { LoginComponent } from './views/auth/login/login.component';
import { AdminComponent } from './admin.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [

    LoginComponent,
     AdminComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ],

})
export class AdminModule { }
