import { Component } from '@angular/core';

import { QueueService, PlayerService } from '../services';
import { Song } from '../domain/song';

@Component({
  selector: 'queue-drawer',
  templateUrl: './queue-drawer.component.html',
  styleUrls: ['./queue-drawer.component.css']
})
export class QueueDrawerComponent {

  get songs() {
    return this.queue.songs;
  }

  constructor(private queue: QueueService, private player: PlayerService) { }

  isSongPlaying(song) {
    return this.queue.currentSong.id === song.id && this.player.playing;
  }

  remove(song) {
    this.queue.remove(song);
  }

  clear() {
    this.queue.clear(this.player.playing);
  }

  shuffle() {
    this.queue.shuffle(this.player.playing);
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

}
