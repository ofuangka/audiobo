import { Injectable } from '@angular/core';

import { Song } from '../domain/song';

@Injectable()
export class PlayerService {

  currentSong: Song = { id: '0', title: 'The Kill', artist: '30 Seconds to Mars', album: 'A Beautiful Lie', duration: 609 };
  playing = false;
  loading = false;
  audio = new Audio();
  progress = 0.0;
  currentTime = 0;

  constructor() {
    this.audio.addEventListener('loadstart', event => this.loading = true);
    this.audio.addEventListener('playing', event => this.playing = true);
    this.audio.addEventListener('pause', event => this.playing = false);
    this.audio.addEventListener('canplay', event => this.loading = false);
    this.audio.addEventListener('timeupdate', event => { this.currentTime = this.audio.currentTime; this.progress = Math.floor(this.currentTime / this.audio.duration * 100) });
    this.audio.addEventListener('ended', event => this.seek(0));
  }

  play() {
    if (this.isPaused()) {
      this.audio.play();
    } else {
      this.restart();
    }
  }

  pause() {
    this.audio.pause();
  }

  seek(to) {
    let newTime = (to / 100) * this.audio.duration;
    this.audio.currentTime = newTime;
  }

  isPaused() {
    return this.audio.src && this.audio.paused;
  }

  restart() {
    this.audio.autoplay = true;
    this.audio.src = 'http://72.182.62.242:4200/30%20Seconds%20to%20Mars/A%20Beautiful%20Lie/003%20-%20The%20Kill.mp3';
  }

}
