import { TestBed } from '@angular/core/testing';

import { IntentoLoginGuard } from './intento-login.guard';

describe('IntentoLoginGuard', () => {
  let guard: IntentoLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IntentoLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
