import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataHistoriaComponent } from './data-historia.component';

describe('DataHistoriaComponent', () => {
  let component: DataHistoriaComponent;
  let fixture: ComponentFixture<DataHistoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataHistoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataHistoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
