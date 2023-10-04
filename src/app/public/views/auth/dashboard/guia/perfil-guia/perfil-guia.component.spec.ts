import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilGuiaComponent } from './perfil-guia.component';

describe('PerfilGuiaComponent', () => {
  let component: PerfilGuiaComponent;
  let fixture: ComponentFixture<PerfilGuiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilGuiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilGuiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
