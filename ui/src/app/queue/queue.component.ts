import { Component, OnInit } from '@angular/core';

import { PlayerService } from '../player.service';

@Component({
  selector: 'queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {
  playing;
  songs = [
    { id: '1', title: 'Holy Dread!', artist: 'Clint Mansell', duration: '3:51' },
    { id: '2', title: 'Finish It', artist: 'Clint Mansell', duration: '4:37' },
    { id: '3', title: 'Death is the Road to Awe', artist: 'Clint Mansell', duration: '5:11' }
  ];

  constructor(private player: PlayerService) { }

  ngOnInit() {
    this.playing = this.player.playing;
  }

  isSongPlaying(song) {
    return this.player.playing.id === song.id;
  }

  remove(song) {

  }

  clear() {
    this.songs = [];
  }

  shuffle() {
    this.songs.sort((a, b) => Math.random() - 0.5);
  }

}
