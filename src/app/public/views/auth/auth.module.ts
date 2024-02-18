import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { InterceptorInterceptor } from 'src/app/core/interceptor/interceptor.interceptor';
import { RegistroComponent } from './registro/registro.component';
import { ReagendarComponent } from './reagendar/reagendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CoreModule } from 'src/app/core/core.module';





@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    LoginComponent,
    RegistroComponent,
    ReagendarComponent,



  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    FullCalendarModule,
   ReactiveFormsModule,
   NgSelectModule,
   NgbModule,
   CoreModule
  ],
  exports:[
    RouterModule
  ],
  providers:[
    DatePipe
  ]
})
export class AuthModule { }
