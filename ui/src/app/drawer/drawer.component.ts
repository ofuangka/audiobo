import { Component } from '@angular/core';

import { QueueService, PlayerService } from '../services';
import { Song } from '../domain/song';

@Component({
  selector: 'drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent {

  get currentIndex() {
    return this.queue.currentIndex;
  }
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

  remove(index: number) {
    if (index === this.currentIndex) {
      this.player.stop();
      this.queue.remove(index);
      if (!this.isQueueEmpty()) {
        if (index === this.currentIndex) {
          this.player.autoload(this.queue.current);
        } else {
          this.player.load(this.queue.current);
        }
      }
    } else {
      this.queue.remove(index);
    }
  }

  clear() {
    this.player.stop();
    this.queue.clear();
  }

  shuffle() {
    this.queue.shuffle();
  }

  skipTo(index: number) {
    this.queue.jumpTo(index);
    this.player.autoload(this.queue.current);
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

}
