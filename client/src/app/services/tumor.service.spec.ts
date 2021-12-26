import { TestBed } from '@angular/core/testing';

import { TumorService } from './tumor.service';

describe('TumorService', () => {
  let service: TumorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TumorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
