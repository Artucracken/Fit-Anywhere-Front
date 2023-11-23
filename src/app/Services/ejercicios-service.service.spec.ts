import { TestBed } from '@angular/core/testing';

import { EjerciciosServiceService } from './ejercicios-service.service';

describe('EjerciciosServiceService', () => {
  let service: EjerciciosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EjerciciosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
