import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendadasComponent } from './agendadas.component';

describe('AgendadasComponent', () => {
  let component: AgendadasComponent;
  let fixture: ComponentFixture<AgendadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendadasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
