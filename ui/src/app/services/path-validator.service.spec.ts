import { TestBed, inject } from '@angular/core/testing';

import { PathValidatorService } from './path-validator.service';

describe('PathValidatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PathValidatorService]
    });
  });

  it('should ...', inject([PathValidatorService], (service: PathValidatorService) => {
    expect(service).toBeTruthy();
  }));
});
