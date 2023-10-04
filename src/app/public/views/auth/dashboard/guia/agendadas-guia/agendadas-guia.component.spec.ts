import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendadasGuiaComponent } from './agendadas-guia.component';

describe('AgendadasGuiaComponent', () => {
  let component: AgendadasGuiaComponent;
  let fixture: ComponentFixture<AgendadasGuiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendadasGuiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendadasGuiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
