import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { PlayerService } from '../player.service';

@Component({
  selector: 'now-playing-controls',
  templateUrl: './now-playing-controls.component.html',
  styleUrls: ['./now-playing-controls.component.css']
})
export class NowPlayingControlsComponent implements OnInit {

  @Output()
  queueToggle: EventEmitter<any> = new EventEmitter();
  
  currentSong;

  constructor(private player: PlayerService) { }

  ngOnInit() {
    this.currentSong = this.player.currentSong;
  }

  toggleQueue() {
    this.queueToggle.emit(null);
  }

  previous() {}
  next() {}
  playPauseRandom() {
    if (!this.isPlaying()) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }
  like() {}
  getPlayButtonIcon() {
    if (this.player.playing) {
      return 'pause';
    } else if (this.player.loading) {
      return 'sync';
    } else {
      return 'play_arrow';
    }
  }
  hasPrevious() {
    return this.player.hasPrevious();
  }
  isPlaying() {
    return this.player.playing;
  }
  getProgress() {
    return this.player.progress;
  }

}
