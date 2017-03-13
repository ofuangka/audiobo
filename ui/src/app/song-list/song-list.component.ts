import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

  songs = [
    { title: 'Death is the Road to Awe', artist: 'Clint Mansell', album: 'The Fountain', duration: '4:38' },
    { title: 'Finish It', artist: 'Clint Mansell', album: 'The Fountain', duration: '4:12' },
    { title: 'Holy Dread!', artist: 'Clint Mansell', album: 'The Fountain', duration: '3:51' }
  ];
  letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  constructor() { }

  ngOnInit() {
  }

  play(song) {

  }

  addToQueue(song) {

  }

  jumpTo(letter) {
    
  }

}
