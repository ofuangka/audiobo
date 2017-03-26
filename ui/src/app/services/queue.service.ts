import { Injectable } from '@angular/core';

import { Song } from '../domain/song';
import { LibraryService } from './library.service';
import { RandomService } from './random.service';

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

  constructor(private library: LibraryService, private random: RandomService) {
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

    /* this loads an array with the QueueEntry objects, sorts it randomly, 
    then recreates the queue in the newly sorted order */
    let buf: QueueEntry[] = [],
      pointer = this.first;
    
    /* create the array */
    while (pointer !== null) {
      buf.push(pointer);
      pointer = pointer.next;
    }

    /* randomize the array */
    buf.sort(() => Math.random() - 0.5);

    /* recreate the queue */
    for (let i = 0; i < buf.length; i++) {
      if (i === 0) {
        buf[i].previous = null;
      } else {
        buf[i].previous = buf[i - 1];
      }
      if (i === buf.length - 1) {
        buf[i].next = null;
      } else {
        buf[i].next = buf[i + 1];
      }
    }
    this.first = (buf.length > 0) ? buf[0] : null;
    this.last = (buf.length > 0) ? buf[buf.length - 1] : null;
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
