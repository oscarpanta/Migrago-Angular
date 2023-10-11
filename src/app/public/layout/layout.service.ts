import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  public constructor() {
    this.showNavigation$ = this.showNavigation.asObservable();
    this.showNavigationfooter$ = this.showNavigationfooter.asObservable();
  }
  public showNavigation$: Observable<boolean>;
  public showNavigationfooter$: Observable<boolean>;

  private showNavigation: Subject<boolean> = new Subject<boolean>();
  private showNavigationfooter: Subject<boolean> = new Subject<boolean>();

  public setNavigationVisibility(visible: boolean): void {
    this.showNavigation.next(visible);
  }

  public setNavigationVisibilityfooter(visible: boolean): void {
    this.showNavigationfooter.next(visible);
  }
}
