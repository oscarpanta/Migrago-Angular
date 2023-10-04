import { TestBed } from '@angular/core/testing';

import { ReagendarGuard } from './reagendar.guard';

describe('ReagendarGuard', () => {
  let guard: ReagendarGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ReagendarGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
