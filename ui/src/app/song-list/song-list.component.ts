import { Component } from '@angular/core';

import { QueueService, LibraryService, PlayerService } from '../services';
import { Song } from '../domain/song';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent {

  get songs() {
    return this.library.songs;
  }
  filteredSongs = this.songs;
  letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  constructor(private queue: QueueService, private library: LibraryService, private player: PlayerService) { }

  play(song) {
    this.queue.clear();
    this.queue.add(song);
    this.player.autoload(this.queue.currentSong);
  }

  addToQueue(song) {
    this.queue.add(song);
  }

  jumpTo(letter) {

  }

  isSongCurrent(song): boolean {
    return this.queue.currentSong && this.queue.currentSong.id === song.id;
  }

  isSongPlaying(song): boolean {
    return this.isSongCurrent(song) && this.player.playing;
  }

}
