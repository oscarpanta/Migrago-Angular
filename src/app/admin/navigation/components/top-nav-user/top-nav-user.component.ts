import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-nav-user',
  templateUrl: './top-nav-user.component.html',
  styleUrls: ['./top-nav-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopNavUserComponent implements OnInit{
  ngOnInit() {}
}
