import { Injectable } from '@angular/core';

import { Song } from '../domain/song';

@Injectable()
export class QueueService {

  constructor() { }

  hasPrevious(song: Song) {
    return false;
  }

}
