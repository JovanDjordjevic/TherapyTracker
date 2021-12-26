import { TestBed } from '@angular/core/testing';

import { BiopsyService } from './biopsy-service.service';

describe('BiopsyService', () => {
  let service: BiopsyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiopsyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
