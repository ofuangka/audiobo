import { TestBed, inject } from '@angular/core/testing';

import { HashCodeService } from './hash-code.service';

describe('HashCodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HashCodeService]
    });
  });

  it('should ...', inject([HashCodeService], (service: HashCodeService) => {
    expect(service).toBeTruthy();
  }));
});
