import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { PlayerService, QueueService } from '../services';

import { Song } from '../domain/song';

@Component({
  selector: 'now-playing-controls',
  templateUrl: './now-playing-controls.component.html',
  styleUrls: ['./now-playing-controls.component.css']
})
export class NowPlayingControlsComponent implements OnInit {

  @Output()
  drawerToggle: EventEmitter<any> = new EventEmitter();

  get nowPlaying() {
    return this.queue.current;
  }
  get elapsedTime() {
    return this.player.currentTime;
  }
  get loading() {
    return this.player.loading;
  }
  get paused() {
    return this.player.paused;
  }
  get playing() {
    return this.player.playing;
  }
  get progress() {
    let ret = this.player.currentTime / this.player.duration;
    return (isNaN(ret)) ? 0 : ret;
  }
  frozenProgress = 0;
  progressFrozen = false;

  constructor(private player: PlayerService, private queue: QueueService) { }

  ngOnInit() {
    this.player.songEnded$.subscribe(() => { if (this.queueHasNext()) { this.skipNext(); } else { this.player.stop(); } });
  }

  denormalize(value: number, max: number) {
    return value / max;
  }

  freezeProgress() {
    this.frozenProgress = this.progress;
    this.progressFrozen = true;
  }

  getPlayButtonIcon(): string {
    if (this.playing) {
      return 'pause';
    } else if (this.loading) {
      return 'sync';
    }
    return 'play_arrow';
  }

  getPlayButtonTitle(): string {
    if (this.playing) {
      return 'Pause';
    } else if (this.loading) {
      return 'Loading';
    }
    return 'Play';
  }

  queueHasNext(): boolean {
    return this.queue.hasNext();
  }

  queueHasPrevious(): boolean {
    return this.queue.hasPrevious();
  }

  isQueueEmpty(): boolean {
    return this.queue.isEmpty();
  }

  normalize(value: number, max: number): number {
    return Math.floor(value * max);
  }

  skipNext() {
    if (this.queue.hasNext()) {
      this.queue.goNext();
      if (this.playing) {
        this.player.autoload(this.nowPlaying);
      } else {
        this.player.load(this.nowPlaying);
      }
    }
  }

  playPause() {
    if (!this.player.initialized) {
      this.player.autoload(this.nowPlaying);
    } else if (this.paused) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }

  skipPrevious() {
    if (this.elapsedTime > 0) {
      this.player.seek(0);
    } else if (this.queue.hasPrevious()) {
      this.queue.goPrevious();
      if (this.playing) {
        this.player.autoload(this.nowPlaying);
      } else {
        this.player.load(this.nowPlaying);
      }

    }
  }

  seek(progress: number) {
    this.player.seek(progress * this.player.duration);
  }

  toggleDrawer() {
    this.drawerToggle.emit(null);
  }

  unfreezeProgress() {
    this.progressFrozen = false;
  }

}
