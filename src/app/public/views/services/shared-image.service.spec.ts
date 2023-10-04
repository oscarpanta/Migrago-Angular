import { TestBed } from '@angular/core/testing';

import { SharedImageService } from './shared-image.service';

describe('SharedImageService', () => {
  let service: SharedImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
