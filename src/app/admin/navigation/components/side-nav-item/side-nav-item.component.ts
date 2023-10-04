import { Component, Input } from '@angular/core';
import { SBRouteData, SideNavItem } from '../../models/navigation.model';

@Component({
  selector: 'app-side-nav-item',
  templateUrl: './side-nav-item.component.html',
  styleUrls: ['./side-nav-item.component.css']
})
export class SideNavItemComponent {
  @Input() sideNavItem!: SideNavItem;
  @Input() isActive!: boolean;

  expanded = false;
  routeData!: SBRouteData;

  constructor() {}
  ngOnInit() {}
}
