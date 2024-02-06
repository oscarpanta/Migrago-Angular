import { TestBed } from '@angular/core/testing';

import { ValidarAdminGuard } from './validar-admin.guard';

describe('ValidarAdminGuard', () => {
  let guard: ValidarAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidarAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
