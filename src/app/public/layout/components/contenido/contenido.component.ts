import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { LayoutService } from '../../layout.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContenidoComponent implements OnDestroy {
  constructor(private displayService:LayoutService, private cd:ChangeDetectorRef, private ngZone:NgZone){}


  showNavigation = true;

  private destroyed: Subject<void> = new Subject<void>();

   ngOnInit(): void {

      //  this.displayService.showNavigation$
      // .pipe(takeUntil(this.destroyed))
      //  .subscribe((visible: boolean) => {
      //    this.showNavigation = visible;
      //  });
      this.displayService.showNavigation$
      .pipe(takeUntil(this.destroyed))
      .subscribe((visible: boolean) => {
        //this.ngZone.runOutsideAngular(() => {
          this.showNavigation = visible;
          this.cd.detectChanges();
        //});
      });

// //    this.cd.detectChanges();
}


  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}


