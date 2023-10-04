import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SideNavItems, SideNavSection } from '../../models/navigation.model';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit,OnDestroy {

  @Input() sidenavStyle!: string;
  @Input() sideNavItems!: SideNavItems;
  @Input() sideNavSections!: SideNavSection[];

  subscription: Subscription = new Subscription();
  routeDataSubscription!: Subscription;

 // constructor(public navigationService: NavigationService, public userService: UserService) {}
  constructor(public navigationService: NavigationService) {}

  ngOnInit() {}

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
}
