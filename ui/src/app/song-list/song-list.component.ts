import { Component, OnInit } from '@angular/core';

import { PlayerService } from '../services';
import { Song } from '../domain/song';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

  songs: [Song] = [
    { id: '0', title: 'The Last Man', artist: 'Clint Mansell', album: 'The Fountain', duration: 100 },
    { id: '1', title: 'Holy Dread!', artist: 'Clint Mansell', album: 'The Fountain', duration: 200 },
    { id: '2', title: 'Finish It', artist: 'Clint Mansell', album: 'The Fountain', duration: 300 },
    { id: '3', title: 'Death is the Road to Awe', artist: 'Clint Mansell', album: 'The Fountain', duration: 400 }
  ];
  filteredSongs = this.songs;
  letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  constructor(private player: PlayerService) { }

  ngOnInit() {
  }

  play(song) {

  }

  addToQueue(song) {

  }

  jumpTo(letter) {

  }

  isSongPlaying(song) {
    return this.player.currentSong.id === song.id;
  }

}
