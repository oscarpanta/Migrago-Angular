import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  private observer!: IntersectionObserver;
  private observedElements: Set<ElementRef> = new Set();
  constructor() {}

  observe(element: ElementRef, callback: () => void): void {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback();
          // this.observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    if (element && element.nativeElement) {
      this.observer.observe(element.nativeElement);
    }
  }

  // observe(element: ElementRef, callback: () => void): void {
  //   if (!this.observer) {
  //     this.observer = new IntersectionObserver(entries => {
  //       entries.forEach(entry => {
  //         if (entry.isIntersecting) {
  //           this.observedElements.forEach(observedElement => {
  //             this.observer.unobserve(observedElement.nativeElement);
  //           });
  //           callback();
  //         }
  //       });
  //     }, {
  //       threshold: 0.1
  //     });
  //   }

  //   if (element && element.nativeElement) {
  //     this.observer.observe(element.nativeElement);
  //     this.observedElements.add(element);
  //   }
  // }

  disconnect(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observedElements.clear();
    }
  }
}
