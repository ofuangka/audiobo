import { TestBed, inject } from '@angular/core/testing';

import { CapabilitiesService } from './capabilities.service';

describe('CapabilitiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CapabilitiesService]
    });
  });

  it('should ...', inject([CapabilitiesService], (service: CapabilitiesService) => {
    expect(service).toBeTruthy();
  }));
});
