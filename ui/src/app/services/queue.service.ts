import { Injectable } from '@angular/core';

import { Song } from '../domain/song';
import { LibraryService } from './library.service';

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

  first: QueueEntry;
  current: QueueEntry;
  last: QueueEntry;
  length: number;
  get currentSong() {
    return (this.current) ? this.current.song : null;
  }
  get songs() {
    let ret = [],
      pointer = this.first;
    while (pointer !== null) {
      ret.push(pointer.song);
      pointer = pointer.next;
    }
    return ret;
  }

  constructor(private library: LibraryService) {
    this.clear();
  }

  add(song: Song) {
    var newEntry = new QueueEntry(this.last, song, null);
    if (this.isEmpty()) {
      this.first = this.current = this.last = newEntry;
    } else {
      this.last.next = newEntry;
      this.last = newEntry;
    }
    this.length++;
  }

  hasPrevious(): boolean {
    return this.current && this.current.previous !== null;
  }

  hasNext(): boolean {
    return this.current && this.current.next !== null;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  previous() {
    if (this.current.previous !== null) {
      this.current = this.current.previous;
    }
  }

  next() {
    if (this.current.next !== null) {
      this.current = this.current.next;
    }
  }

  remove(song: Song) {
    let pointer = this.first;
    while (pointer) {
      if (pointer.song === song) {
        if (this.length === 1) {
          this.clear();
        } else {
          if (pointer.previous) {
            pointer.previous.next = pointer.next;
          }
          if (pointer.next) {
            pointer.next.previous = pointer.previous;
          }
          if (pointer === this.first) {
            this.first = pointer.next;
          }
          if (pointer === this.current) {
            this.current = pointer.next || pointer.previous;
          }
          if (pointer === this.last) {
            this.last = pointer.previous;
          }
          this.length--;
        }
        break;
      }
      pointer = pointer.next;
    }
  }

  clear() {
    this.first = this.current = this.last = null;
    this.length = 0;
  }

  shuffle() {
    /* TODO: implement */
  }

  skipTo(song: Song) {
    let pointer = this.first;
    while (pointer) {
      if (pointer.song === song) {
        this.current = pointer;
        break;
      }
      pointer = pointer.next;
    }
  }

}
