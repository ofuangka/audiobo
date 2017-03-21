import { Component, OnInit } from '@angular/core';

import { PlayerService } from '../services';
import { Song } from '../domain/song';

@Component({
  selector: 'queue-drawer',
  templateUrl: './queue-drawer.component.html',
  styleUrls: ['./queue-drawer.component.css']
})
export class QueueDrawerComponent implements OnInit {
  currentSong;
  songs: [Song] = [
    { id: '1', title: 'Holy Dread!', artist: 'Clint Mansell', album: 'The Fountain', duration: 100 },
    { id: '2', title: 'Finish It', artist: 'Clint Mansell', album: 'The Fountain', duration: 200 },
    { id: '3', title: 'Death is the Road to Awe', artist: 'Clint Mansell', album: 'The Fountain', duration: 300 }
  ];

  constructor(private player: PlayerService) { }

  ngOnInit() {
    this.currentSong = this.player.currentSong;
  }

  isSongPlaying(song) {
    return this.currentSong.id === song.id;
  }

  remove(song) {

  }

  clear() {
    this.songs.length = 0;
  }

  shuffle() {
    this.songs.sort((a, b) => Math.random() - 0.5);
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

}
