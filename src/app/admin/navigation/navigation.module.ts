import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { DashboardHeadComponent } from './components/dashboard-head/dashboard-head.component';
import { SideNavItemComponent } from './components/side-nav-item/side-nav-item.component';
import { TopNavUserComponent } from './components/top-nav-user/top-nav-user.component';
import { FooterComponent } from './containers/footer/footer.component';
import { SideNavComponent } from './containers/side-nav/side-nav.component';
import { TopNavComponent } from './containers/top-nav/top-nav.component';
import { LayoutErrorComponent } from './layouts/layout-error/layout-error.component';
import { NavigationService } from './services/navigation.service';
import { RouterModule } from '@angular/router';
import { LayoutDashboardComponent } from './layouts/layout-dashboard/layout-dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    DashboardHeadComponent,
    SideNavItemComponent,
    TopNavUserComponent,
    FooterComponent,
    SideNavComponent,
    TopNavComponent,
    LayoutDashboardComponent,
    LayoutErrorComponent
  ],
  imports: [
    CommonModule, RouterModule,NgbModule
  ],
  providers:[
    NavigationService
  ],
  exports:[
    BreadcrumbsComponent,
    DashboardHeadComponent,
    SideNavItemComponent,
    TopNavUserComponent,
    FooterComponent,
    SideNavComponent,
    TopNavComponent,
    LayoutDashboardComponent,
    LayoutErrorComponent
  ]
})
export class NavigationModule { }
