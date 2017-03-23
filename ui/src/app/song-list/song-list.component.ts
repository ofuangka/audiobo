import { Component, OnInit } from '@angular/core';

import { QueueService } from '../services';
import { Song } from '../domain/song';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

  songs = [Song];
  filteredSongs = this.songs;
  letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  constructor(private queue: QueueService) { }

  ngOnInit() {
  }

  play(song) {

  }

  addToQueue(song) {

  }

  jumpTo(letter) {

  }

  isSongPlaying(song) {
    return this.queue.currentSong.id === song.id;
  }

}
