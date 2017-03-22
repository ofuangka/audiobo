import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { PlayerService, QueueService } from '../services';

@Component({
  selector: 'now-playing-controls',
  templateUrl: './now-playing-controls.component.html',
  styleUrls: ['./now-playing-controls.component.css']
})
export class NowPlayingControlsComponent implements OnInit {

  @Output()
  queueToggle: EventEmitter<any> = new EventEmitter();

  currentSong;
  frozenProgress = 0;
  progressDisabled = false;

  constructor(private player: PlayerService, private queue: QueueService) { }

  ngOnInit() {
    this.currentSong = this.player.currentSong;
  }

  toggleQueue() {
    this.queueToggle.emit(null);
  }

  previous() {
    if (this.getProgress() > 0) {
      this.player.restart();
    } else {
      /* TODO: implement */
    }
  }
  next() { }
  playPauseRandom() {
    if (!this.isPlaying()) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }
  like() { }
  getPlayButtonIcon() {
    if (this.isPlaying()) {
      return 'pause';
    } else if (this.isLoading()) {
      return 'sync';
    } else {
      return 'play_arrow';
    }
  }
  hasPrevious() {
    return this.queue.hasPrevious(this.player.currentSong);
  }
  isPlaying() {
    return this.player.playing;
  }
  isLoading() {
    return this.player.loading;
  }
  getProgress() {
    return this.player.progress;
  }
  seek(event) {
    this.player.seek(event.value);
  }
  isPaused() {
    return this.player.isPaused();
  }
  getCurrentTime() {
    return this.player.currentTime;
  }

  disableProgress() {
    this.frozenProgress = this.player.progress;
    this.progressDisabled = true;
  }

  enableProgress() {
    this.progressDisabled = false;
  }

}
