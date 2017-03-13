import { Injectable } from '@angular/core';

@Injectable()
export class PlayerService {

  constructor() { }

  isPlaying(track) {
    return track.id === '0';
  }

}
