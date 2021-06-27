import { TestBed } from '@angular/core/testing';

import { ProducerServiceService } from './producer-service.service';

describe('ProducerServiceService', () => {
  let service: ProducerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProducerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
