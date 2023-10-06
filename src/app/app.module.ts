import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './public/layout/layout.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { InterceptorInterceptor } from './core/interceptor/interceptor.interceptor';
import { TemasComponent } from './public/views/temas/temas.component';
import { LOCALE_ID } from '@angular/core';


@NgModule({
  declarations: [
    AppComponent,
   // TemasComponent,
  //  HomeComponent,


  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    CoreModule,



  ],
  providers: [
   // {provide: LOCALE_ID, useValue: 'es' },
    {
     //provide: LOCALE_ID, useValue: 'es',
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
