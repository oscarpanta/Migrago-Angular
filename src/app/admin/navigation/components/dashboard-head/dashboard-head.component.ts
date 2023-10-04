import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-head',
  templateUrl: './dashboard-head.component.html',
  styleUrls: ['./dashboard-head.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHeadComponent {
  @Input() title!: string;
  @Input() hideBreadcrumbs = false;

  constructor() {}
  ngOnInit() {}
}
