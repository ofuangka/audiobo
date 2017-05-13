import { TestBed, inject } from '@angular/core/testing';

import { LibrarySetupService } from './library-setup.service';

describe('LibrarySetupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LibrarySetupService]
    });
  });

  it('should ...', inject([LibrarySetupService], (service: LibrarySetupService) => {
    expect(service).toBeTruthy();
  }));
});
