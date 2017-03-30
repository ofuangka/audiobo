import { Injectable } from '@angular/core';

import { HashCodeService } from './hash-code.service';

let NUM_BG_COLORS = 10;

@Injectable()
export class BackgroundColorService {

  constructor(private hashCode: HashCodeService) { }

  get(s: string): string {
    return 'bg-' + (this.hashCode.get(s) % NUM_BG_COLORS);
  }

}
