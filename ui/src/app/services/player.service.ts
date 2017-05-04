import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Song } from '../domain/song';

@Injectable()
export class PlayerService {

  private audio = new Audio();
  private error = new Subject();
  private songEnded = new Subject();

  currentTime = 0;
  durationAvailable = false;
  error$ = this.error.asObservable();
  songEnded$ = this.songEnded.asObservable();
  loading = false;
  playing = false;

  get duration() {
    return this.audio.duration;
  }
  get initialized() {
    return !!this.audio.src;
  }
  get paused() {
    return this.audio.paused;
  }

  constructor() {
    this.audio.autoplay = false;
    this.audio.addEventListener('loadstart', event => { this.playing = false; this.loading = true });
    this.audio.addEventListener('playing', event => this.playing = true);
    this.audio.addEventListener('pause', event => this.playing = false);
    this.audio.addEventListener('canplay', event => { this.loading = false });
    this.audio.addEventListener('timeupdate', event => { this.currentTime = this.audio.currentTime });
    this.audio.addEventListener('ended', event => this.songEnded.next());
    this.audio.addEventListener('error', event => this.error.next(event.error));
    this.audio.addEventListener('loadedmetadata', event => { if (this.audio.duration !== Infinity) { this.durationAvailable = true } } );
  }

  autoload(song: Song) {
    this.durationAvailable = false;
    this.audio.autoplay = true;
    this.audio.src = this.getSrc(song);
  }

  load(song: Song) {
    this.durationAvailable = false;
    this.audio.autoplay = false;
    this.audio.src = this.getSrc(song);
  }

  pause() {
    this.audio.pause();
  }

  play() {
    this.audio.play();
  }

  seek(newTime: number) {
    this.audio.currentTime = newTime;
  }

  stop() {
    this.seek(0);
    this.pause();
    this.loading = false;
  }

  getSrc(song: Song): string {
    return `/api/songs/${song.id}`;
  }

}
