import { TestBed, inject } from '@angular/core/testing';

import { BackgroundColorService } from './background-color.service';

describe('BackgroundColorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackgroundColorService]
    });
  });

  it('should ...', inject([BackgroundColorService], (service: BackgroundColorService) => {
    expect(service).toBeTruthy();
  }));
});
