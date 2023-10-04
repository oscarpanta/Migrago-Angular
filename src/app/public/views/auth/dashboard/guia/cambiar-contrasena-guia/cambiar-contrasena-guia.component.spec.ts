import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarContrasenaGuiaComponent } from './cambiar-contrasena-guia.component';

describe('CambiarContrasenaGuiaComponent', () => {
  let component: CambiarContrasenaGuiaComponent;
  let fixture: ComponentFixture<CambiarContrasenaGuiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiarContrasenaGuiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambiarContrasenaGuiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
