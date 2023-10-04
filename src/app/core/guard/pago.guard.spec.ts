import { TestBed } from '@angular/core/testing';

import { PagoGuard } from './pago.guard';

describe('PagoGuard', () => {
  let guard: PagoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PagoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
