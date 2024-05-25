import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor() {
    this.initScrollListener();
  }

  private initScrollListener() {
    window.addEventListener('scroll', this.checkScrollPosition.bind(this));
  }

  private checkScrollPosition() {
    const element = document.querySelector('.container__resenias');
    if (element && this.isElementInViewport(element)) {
      element.classList.add('animate__animated', 'animate__backInLeft');
      window.removeEventListener('scroll', this.checkScrollPosition.bind(this)); // Remove listener after animation
    }
  }

  private isElementInViewport(el: Element): boolean {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}
