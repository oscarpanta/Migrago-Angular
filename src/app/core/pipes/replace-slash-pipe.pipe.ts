import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceSlashPipe'
})
export class ReplaceSlashPipePipe implements PipeTransform {

  transform(value: string): string {
    return value.toLowerCase().replace(/\s*\/\s*/g, ', ');
  }

}
