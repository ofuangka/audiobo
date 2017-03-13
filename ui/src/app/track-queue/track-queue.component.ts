import { Component, OnInit } from '@angular/core';

import { PlayerService } from '../player.service';

@Component({
  selector: 'track-queue',
  templateUrl: './track-queue.component.html',
  styleUrls: ['./track-queue.component.css']
})
export class TrackQueueComponent implements OnInit {

  tracks = [
    { id: '0', title: 'The Last Man', artist: 'Clint Mansell', duration: '6:09' },
    { id: '1', title: 'Holy Dread!', artist: 'Clint Mansell', duration: '3:51' },
    { id: '2', title: 'Finish It', artist: 'Clint Mansell', duration: '4:37' },
    { id: '3', title: 'Death is the Road to Awe', artist: 'Clint Mansell', duration: '5:11' }
  ].reverse();

  constructor(private player: PlayerService) { }

  ngOnInit() {
  }

  isPlaying(track) {
    return this.player.isPlaying(track);
  }

  removeTrack(track) {

  }

  clearQueue() {
    this.tracks = [];
  }

  shuffleQueue() {
    this.tracks.sort((a, b) => Math.random() - 0.5);
  }

}
