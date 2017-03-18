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

  playing;

  constructor(private player: PlayerService) { }

  ngOnInit() {
    this.playing = this.player.playing;
  }

  toggleQueue() {
    this.queueToggle.emit(null);
  }

  previous() {}
  next() {}
  playPauseRandom() {}
  like() {}
  getPlayButtonIcon() {
    if (this.player.isPlaying()) {
      return 'pause';
    } else if (this.playing === null) {
      return 'casino';
    } else {
      return 'play_arrow';
    }
  }
  hasPrevious() {
    return this.player.hasPrevious();
  }
  isPlaying() {
    return this.player.isPlaying();
  }

}
