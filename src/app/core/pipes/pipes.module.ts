import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReplaceSlashPipePipe } from './replace-slash-pipe.pipe';



@NgModule({
  declarations: [
    ReplaceSlashPipePipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ReplaceSlashPipePipe
  ]
})
export class PipesModule { }
