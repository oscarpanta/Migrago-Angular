import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavUserComponent } from './top-nav-user.component';

describe('TopNavUserComponent', () => {
  let component: TopNavUserComponent;
  let fixture: ComponentFixture<TopNavUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopNavUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopNavUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
