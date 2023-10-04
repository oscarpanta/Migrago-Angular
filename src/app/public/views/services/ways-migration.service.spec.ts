import { TestBed } from '@angular/core/testing';

import { WaysMigrationService } from './ways-migration.service';

describe('WaysMigrationService', () => {
  let service: WaysMigrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaysMigrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
