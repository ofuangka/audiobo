import { Component, OnInit } from '@angular/core';

import { PlayerService } from '../player.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

  songs = [
    { id: '0', title: 'Death is the Road to Awe', artist: 'Clint Mansell', album: 'The Fountain', duration: '4:38' },
    { id: '1', title: 'Finish It', artist: 'Clint Mansell', album: 'The Fountain', duration: '4:12' },
    { id: '2', title: 'Holy Dread!', artist: 'Clint Mansell', album: 'The Fountain', duration: '3:51' }
  ];
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

  isPlaying(song) {
    return this.player.isPlaying(song);
  }

}
