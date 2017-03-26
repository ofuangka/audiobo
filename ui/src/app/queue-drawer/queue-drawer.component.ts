import { Component } from '@angular/core';

import { QueueService, PlayerService } from '../services';
import { Song } from '../domain/song';

@Component({
  selector: 'queue-drawer',
  templateUrl: './queue-drawer.component.html',
  styleUrls: ['./queue-drawer.component.css']
})
export class QueueDrawerComponent {

  private selectedSong: Song;
  get songs() {
    return this.queue.songs;
  }

  constructor(private queue: QueueService, private player: PlayerService) { }

  handleSongClick(song: Song) {
    
  }

  isEmpty(): boolean {
    return this.queue.isEmpty();
  }

  isSongCurrent(song: Song): boolean {
    return this.queue.currentSong && this.queue.currentSong === song;
  }

  isSongPlaying(song: Song): boolean {
    return this.isSongCurrent(song) && this.player.playing;
  }

  remove(song: Song) {
    if (this.queue.length === 1) {
      this.clear();
    } else {
      if (this.isSongPlaying(song)) {
        if (this.queue.hasNext()) {
          this.queue.remove(song);
          this.player.autoload(this.queue.currentSong);
        } else {
          this.queue.remove(song);
          this.player.pause();
          this.player.seek(0);
        }
      } else {
        this.queue.remove(song);
      }
    }
  }

  clear() {
    if (this.player.playing) {
      this.player.pause();
      this.player.seek(0);
    }
    this.queue.clear();
  }

  shuffle() {
    this.queue.shuffle();
  }

  skipTo(song: Song) {
    this.queue.skipTo(song);
    this.player.autoload(this.queue.currentSong);
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

}
