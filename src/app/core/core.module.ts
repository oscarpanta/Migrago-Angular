import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReplaceSlashPipePipe } from './pipes/replace-slash-pipe.pipe';

//import { HttpCoreService } from './services/http-core.service';



@NgModule({
  declarations: [


       // NotZeroDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    //NotZeroDirective
  ],
  providers: [
  //  HttpCoreService,

  ],
})
export class CoreModule { }
