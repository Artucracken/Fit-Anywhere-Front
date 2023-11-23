import { TestBed } from '@angular/core/testing';

import { RutinaServiceService } from './rutina-service.service';

describe('RutinaServiceService', () => {
  let service: RutinaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RutinaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
