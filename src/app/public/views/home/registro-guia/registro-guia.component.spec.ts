import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroGuiaComponent } from './registro-guia.component';

describe('RegistroGuiaComponent', () => {
  let component: RegistroGuiaComponent;
  let fixture: ComponentFixture<RegistroGuiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroGuiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroGuiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
