import { Component, OnInit } from '@angular/core';

import { MdDialogRef } from '@angular/material';

import { LibraryService } from '../services';

@Component({
  selector: 'about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.css']
})
export class AboutDialogComponent implements OnInit {

  totalTime = 0;

  get numSongs() {
    return this.library.songs.length;
  }
  get numAlbums() {
    return this.library.albums.length;
  }
  get refreshing() {
    return this.library.refreshing;
  }

  constructor(private library: LibraryService, public dialogRef: MdDialogRef<AboutDialogComponent>) { }

  ngOnInit() {
    for (let id in this.library.songs) {
      this.totalTime += this.library.songs[id].duration;
    }
  }

}
