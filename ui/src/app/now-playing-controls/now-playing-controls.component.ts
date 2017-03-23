import { Component, Output, EventEmitter } from '@angular/core';

import { PlayerService, QueueService } from '../services';

import { Song } from '../domain/song';

@Component({
  selector: 'now-playing-controls',
  templateUrl: './now-playing-controls.component.html',
  styleUrls: ['./now-playing-controls.component.css']
})
export class NowPlayingControlsComponent {

  @Output()
  queueToggle: EventEmitter<any> = new EventEmitter();

  get currentSong() {
    return this.queue.currentSong;
  }
  frozenProgress = 0;
  progressDisabled = false;
  get currentTime() {
    return this.player.currentTime;
  }
  get loading() {
    return this.player.loading;
  }
  get playing() {
    return this.player.playing;
  }
  get playStatusIcon() {
    if (this.playing) {
      return 'pause';
    } else if (this.loading) {
      return 'sync';
    } else {
      return 'play_arrow';
    }
  }
  get progress() {
    return this.player.progress;
  }
  get paused() {
    return this.player.paused;
  }

  constructor(private player: PlayerService, private queue: QueueService) { }

  freezeProgress() {
    this.frozenProgress = this.player.progress;
    this.progressDisabled = true;
  }

  hasPrevious() {
    return this.queue.hasPrevious();
  }

  like() {
    /* TODO: implement */
  }

  next() {
    this.queue.next();
    this.player.autoload(this.currentSong);
  }

  playPause() {
    if (!this.player.initialized) {
      this.player.autoload(this.currentSong);
    } else if (this.paused) {
      this.player.unpause();
    } else {
      this.player.pause();
    }
  }

  previous() {
    if (this.progress > 0) {
      this.player.seek(0);
    } else {
      /* TODO: implement */
    }
  }

  seek(to: number) {
    this.player.seek(to);
  }

  toggleQueue() {
    this.queueToggle.emit(null);
  }

  unfreezeProgress() {
    this.progressDisabled = false;
  }

}
