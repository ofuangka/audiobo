import { Injectable } from '@angular/core';

import { Song } from '../domain/song';

const MAX_PROGRESS = 1000;

@Injectable()
export class PlayerService {

  audio = new Audio();
  currentTime = 0;
  loading = false;
  playing = false;
  get initialized() {
    return !!this.audio.src;
  }
  get paused() {
    return this.audio.paused;
  }
  get progress() {
    return Math.floor(this.currentTime / this.audio.duration * MAX_PROGRESS);
  }

  constructor() {
    this.audio.addEventListener('loadstart', event => this.loading = true);
    this.audio.addEventListener('playing', event => this.playing = true);
    this.audio.addEventListener('pause', event => this.playing = false);
    this.audio.addEventListener('canplay', event => this.loading = false);
    this.audio.addEventListener('timeupdate', event => { this.currentTime = this.audio.currentTime });
    this.audio.addEventListener('ended', event => this.seek(0));
  }
  
  autoload(song: Song) {
    this.audio.autoplay = true;
    this.audio.src = this.getSrc(song);
  }

  pause() {
    this.audio.pause();
  }

  seek(to) {
    let newTime = (to / MAX_PROGRESS) * this.audio.duration;
    this.audio.currentTime = newTime;
  }

  unpause() {
    this.audio.play();
  }

  getSrc(song: Song): string {
    return song.id;
  }

}
