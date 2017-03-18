import { Injectable } from '@angular/core';

@Injectable()
export class PlayerService {

  playing = { id: '0', title: 'The Last Man', artist: 'Clint Mansell', duration: '6:09' };

  constructor() { }

  isPlaying() {
    return false;
  }

  play() {
    return Promise.resolve();
  }

  pause() {

  }

  seek() {
    return Promise.resolve();
  }

  hasNext() {
    return true;
  }

  hasPrevious() {
    return false;
  }

}
