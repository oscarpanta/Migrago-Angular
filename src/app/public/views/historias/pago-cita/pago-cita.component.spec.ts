import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoCitaComponent } from './pago-cita.component';

describe('PagoCitaComponent', () => {
  let component: PagoCitaComponent;
  let fixture: ComponentFixture<PagoCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoCitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
