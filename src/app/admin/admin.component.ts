import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../public/layout/layout.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private displayService: LayoutService){}
  ngOnInit(): void {
    this.displayService.setNavigationVisibility(false);
  }
  ngOnDestroy(): void {
    this.displayService.setNavigationVisibility(true);
  }
}
