import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGuiaComponent } from './data-guia.component';

describe('DataGuiaComponent', () => {
  let component: DataGuiaComponent;
  let fixture: ComponentFixture<DataGuiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataGuiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataGuiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
