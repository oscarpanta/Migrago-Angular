import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit{
  constructor(private navigationService: NavigationService) {}
  ngOnInit() {}
  toggleSideNav() {
      this.navigationService.toggleSideNav();
  }
}
