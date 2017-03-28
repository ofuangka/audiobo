import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

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

  private _current: QueueEntry;
  private _first: QueueEntry;
  private _last: QueueEntry;
  private currentChanged = new Subject();

  currentChanged$ = this.currentChanged.asObservable();
  length: number;

  get current() {
    return (this._current) ? this._current.song : null;
  }

  constructor(private library: LibraryService, private random: RandomService) {
    this.clear();
  }

  asArray(): Song[] {
    let ret = [],
      pointer = this._first;
    while (pointer !== null) {
      ret.push(pointer.song);
      pointer = pointer.next;
    }
    return ret;
  }

  add(song: Song) {
    var newEntry = new QueueEntry(this._last, song, null);
    if (this.isEmpty()) {
      this._first = this._current = this._last = newEntry;
      this.currentChanged.next(this.current);
    } else {
      this._last.next = newEntry;
      this._last = newEntry;
    }
    this.length++;
  }

  clear() {
    this._first = this._current = this._last = null;
    this.currentChanged.next(this.current);
    this.length = 0;
  }

  hasPrevious(): boolean {
    return this._current && this._current.previous !== null;
  }

  hasNext(): boolean {
    return this._current && this._current.next !== null;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  jumpTo(song: Song) {
    let pointer = this._first;
    while (pointer) {
      if (pointer.song === song) {
        this._current = pointer;
        this.currentChanged.next(this.current);
        break;
      }
      pointer = pointer.next;
    }
  }

  goPrevious() {
    if (this._current.previous !== null) {
      this._current = this._current.previous;
      this.currentChanged.next(this.current);
    }
  }

  goNext() {
    if (this._current.next !== null) {
      this._current = this._current.next;
      this.currentChanged.next(this.current);
    }
  }

  remove(song: Song) {
    let pointer = this._first;
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
          if (pointer === this._first) {
            this._first = pointer.next;
          }
          if (pointer === this._current) {
            this._current = pointer.next || pointer.previous;
            this.currentChanged.next(this.current);
          }
          if (pointer === this._last) {
            this._last = pointer.previous;
          }
          this.length--;
        }
        break;
      }
      pointer = pointer.next;
    }
  }

  shuffle() {

    /* this loads an array with the QueueEntry objects, sorts it randomly, 
    then recreates the queue in the newly sorted order */
    let buf: QueueEntry[] = [],
      pointer = this._first;
    
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
    this._first = (buf.length > 0) ? buf[0] : null;
    this._last = (buf.length > 0) ? buf[buf.length - 1] : null;
  }

}
