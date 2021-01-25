import { TestBed } from '@angular/core/testing';

import { NexosmedicalService } from './nexosmedical.service';

describe('NexosmedicalService', () => {
  let service: NexosmedicalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NexosmedicalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
