import { Component, OnInit } from '@angular/core';

import { LibraryService } from '../services';

@Component({
  selector: 'library-status',
  templateUrl: './library-status.component.html',
  styleUrls: ['./library-status.component.css']
})
export class LibraryStatusComponent implements OnInit {

  numAlbums = 0;
  numSongs = 0;
  totalRunningTime = 0;

  get refreshing() {
    return this.library.refreshing;
  }

  constructor(private library: LibraryService) { }

  ngOnInit() {
    this.numAlbums = Object.keys(this.library.albums).length;
    this.numSongs = Object.keys(this.library.songs).length;

    this.totalRunningTime = 0;
    for (let songId in this.library.songs) {
      this.totalRunningTime += this.library.songs[songId].duration;
    }
  }

}
