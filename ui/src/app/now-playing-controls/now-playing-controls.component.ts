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
  queueToggle: EventEmitter<any> = new EventEmitter();

  get currentDuration() {
    return this.player.currentDuration;
  }
  get currentSong() {
    return this.queue.currentSong;
  }
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
  frozenProgress = 0;
  progressDisabled = false;

  constructor(private player: PlayerService, private queue: QueueService) { }

  ngOnInit() {
    this.player.songComplete$.subscribe(() => this.next());
  }

  freezeProgress() {
    this.frozenProgress = this.player.progress;
    this.progressDisabled = true;
  }

  hasNext() {
    return this.queue.hasNext();
  }

  hasPrevious() {
    return this.queue.hasPrevious();
  }

  isQueueEmpty() {
    return this.queue.isEmpty();
  }

  like() {
    /* TODO: implement */
  }

  next() {
    if (this.queue.hasNext()) {
      this.queue.next();
      this.player.autoload(this.currentSong);
    }
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
    if (this.progress > 1) {
      this.player.seek(0);
    } else if (this.queue.hasPrevious()) {
      this.queue.previous();
      this.player.autoload(this.currentSong);
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
