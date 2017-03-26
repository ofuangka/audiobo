import { Injectable } from '@angular/core';

import { LibraryService } from './library.service';
import { Song, Album } from '../domain';

@Injectable()
export class ComparatorService {

  property = (property: string, reverse: boolean) => {
    return (a: Object, b: Object) => {
      if (reverse) {
        return (a[property] < b[property]) ? 1 : -1;
      }
      return (a[property] > b[property]) ? 1 : -1;
    };
  };

  songAlbumTitle = (reverse: boolean) => {
    return (a: Song, b: Song) => {
      if (reverse) {
        return (this.getSongAlbumTitle(a) < this.getSongAlbumTitle(b)) ? 1 : -1;
      }
      return (this.getSongAlbumTitle(a) > this.getSongAlbumTitle(b)) ? 1 : -1;
    };
  };

  constructor(private library: LibraryService) { }

  private getSongAlbumTitle(song: Song): string {
    return this.library.albums[song.albumId].title;
  }

}
