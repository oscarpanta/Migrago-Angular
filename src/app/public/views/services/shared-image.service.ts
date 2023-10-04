import { Injectable } from '@angular/core';
import { ImagenesService } from './imagenes.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedImageService {

  private imageSource = new BehaviorSubject<string>('');
  currentImage$ = this.imageSource.asObservable();

  private imageUrlSource = new BehaviorSubject<string>('');
  currentImageUrl$ = this.imageUrlSource.asObservable();

  constructor(private imagenservice: ImagenesService) { }

  changeImage(newImage: string, imageUrl: string) {
    this.imageSource.next(newImage);


    this.imageUrlSource.next(imageUrl);
  }
}
