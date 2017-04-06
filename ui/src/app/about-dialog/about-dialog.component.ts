import { Component, OnInit } from '@angular/core';

import { MdDialogRef } from '@angular/material';

import { LibraryService } from '../services';

@Component({
  selector: 'about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.css']
})
export class AboutDialogComponent implements OnInit {

  numSongs = 0;
  numAlbums = 0;
  totalTime = 0;

  get refreshing() {
    return this.library.refreshing;
  }

  constructor(private library: LibraryService, public dialogRef: MdDialogRef<AboutDialogComponent>) { }

  ngOnInit() {
    this.numSongs = Object.keys(this.library.songs).length;
    this.numAlbums = Object.keys(this.library.albums).length;
    for (let id in this.library.songs) {
      this.totalTime += this.library.songs[id].duration;
    }
  }

}
