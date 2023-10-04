import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Breadcrumb } from '../../models/navigation.model';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {

  subscription: Subscription = new Subscription();
  breadcrumbs!: Breadcrumb[];

  constructor(public navigationService: NavigationService) {}
  ngOnInit() {
      this.subscription.add(
          this.navigationService.routeData$().subscribe(routeData => {
              this.breadcrumbs = routeData.breadcrumbs;
          })
      );
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

}
