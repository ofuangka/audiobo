import { Component } from '@angular/core';

import { QueueService, PlayerService } from '../services';
import { Song } from '../domain/song';

@Component({
  selector: 'drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent {

  get songs() {
    return this.queue.asArray();
  }

  constructor(private queue: QueueService, private player: PlayerService) { }

  handleSongClick(song: Song) {

  }

  isQueueEmpty(): boolean {
    return this.queue.isEmpty();
  }

  isSongCurrent(song: Song): boolean {
    return this.queue.current && this.queue.current === song;
  }

  isSongPlaying(song: Song): boolean {
    return this.isSongCurrent(song) && this.player.playing;
  }

  remove(song: Song) {
    if (this.isSongCurrent(song)) {
      this.player.stop();
      this.queue.remove(song);
      if (!this.isQueueEmpty()) {
        this.player.autoload(this.queue.current);
      }
    } else {
      this.queue.remove(song);
    }
  }

  clear() {
    this.player.stop();
    this.queue.clear();
  }

  shuffle() {
    this.queue.shuffle();
  }

  skipTo(song: Song) {
    this.queue.jumpTo(song);
    this.player.autoload(this.queue.current);
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

}
