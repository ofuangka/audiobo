import { Injectable } from '@angular/core';

import { Song } from '../domain/song';

class QueueEntry {
  previous: QueueEntry;
  song: Song;
  next: QueueEntry;

  constructor(previous: QueueEntry, song: Song, next: QueueEntry) {
    this.previous = previous;
    this.song = song;
    this.next = next;
  }
}

@Injectable()
export class QueueService {

  current: QueueEntry;
  get currentSong() {
    return this.current.song;
  }
  get songs() {
    let ret = [],
      pointer = this.current;
    do {
      ret.push(pointer.song);
      pointer = pointer.next;
    } while (pointer !== null);
    return ret;
  }

  constructor() {
    this.current = new QueueEntry(null, this.getRandomSong(), null);
  }

  hasPrevious(): boolean {
    return this.current.previous !== null;
  }

  getRandomSong(): Song {
    let bag = [{ id: 'http://192.168.1.26:4200/30%20Seconds%20to%20Mars/A%20Beautiful%20Lie/003%20-%20The%20Kill.mp3', track: 1, title: 'The Kill', artist: '30 Seconds to Mars', album: 'A Beautiful Lie', duration: 500 }];
    return bag[0];
  }

  previous() {
    if (this.current.previous !== null) {
      this.current = this.current.previous;
    }
  }

  next() {
    if (this.current.next !== null) {
      this.current = this.current.next;
    } else {
      this.current = new QueueEntry(null, this.getRandomSong(), null);
    }
  }

  remove(song: Song) {
    /* TODO: implement */
  }

  clear(preserveCurrent: boolean) {
    /* TODO: implement */
  }

  shuffle(preserveCurrent: boolean) {
    /* TODO: implement */
  }

}
