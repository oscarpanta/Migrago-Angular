import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UneteRoutingModule } from './unete-routing.module';
import { UneteComponent } from './unete.component';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { HomeModule } from '../home/home.module';


@NgModule({
  declarations: [
    UneteComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UneteRoutingModule,
    HomeModule
  ],
  exports: [
    RouterModule,
  ]
})
export class UneteModule { }
