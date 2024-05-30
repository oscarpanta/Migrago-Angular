import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReplaceSlashPipePipe } from './replace-slash-pipe.pipe';
import { FormatoTemasPipe } from './formato-temas.pipe';



@NgModule({
  declarations: [
    ReplaceSlashPipePipe,
    FormatoTemasPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ReplaceSlashPipePipe,
    FormatoTemasPipe
  ]
})
export class PipesModule { }
