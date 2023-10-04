import { TestBed } from '@angular/core/testing';

import { ValidartokenGuiaGuard } from './validartoken-guia.guard';

describe('ValidartokenGuiaGuard', () => {
  let guard: ValidartokenGuiaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidartokenGuiaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
