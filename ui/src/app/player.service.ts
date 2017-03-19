import { Injectable } from '@angular/core';

@Injectable()
export class PlayerService {

  currentSong = { id: '0', title: 'The Last Man', artist: 'Clint Mansell', duration: '6:09' };
  playing = false;
  loading = false;
  audio = new Audio();
  progress = 0.0;

  constructor() {
    this.audio.addEventListener('loadstart', event => this.loading = true);
    this.audio.addEventListener('playing', event => this.playing = true);
    this.audio.addEventListener('pause', event => this.playing = false);
    this.audio.addEventListener('canplay', event => this.loading = false);
    this.audio.addEventListener('timeupdate', event => { this.progress = Math.floor(this.audio.currentTime / this.audio.duration * 100) });
  }

  play() {
    this.audio.autoplay = true;
    this.audio.src = 'http://72.182.62.242:4200/30%20Seconds%20to%20Mars/A%20Beautiful%20Lie/003%20-%20The%20Kill.mp3';
  }

  pause() {
    this.audio.pause();
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
