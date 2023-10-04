import { Component, Input } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { DataStories, ResponseStories, Stories } from '../../interfaces/stories.interface';

register()
@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent {
  //@Input() historia!: Stories;
  @Input() historia!: any;


}
