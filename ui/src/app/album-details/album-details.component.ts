import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { LibraryService, ComparatorService, QueueService, PlayerService } from '../services';
import { Song, Album } from '../domain';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {

  album: Album;
  songs: Song[];
  sortedBy: string;

  constructor(private route: ActivatedRoute, private library: LibraryService, private comparator: ComparatorService, private queue: QueueService, private player: PlayerService) { }

  ngOnInit() {
    let albumId = this.route.snapshot.params['albumId']
    this.album = this.library.albums[albumId];
    this.songs = [];
    for (let songId of this.album.songIds) {
      this.songs.push(this.library.songs[songId]);
    }
    this.songs.sort(this.comparator.property('track', false));
  }

  isSongCurrent(song: Song): boolean {
    return this.queue.current === song;
  }

  isSongPlaying(song: Song): boolean {
    return this.isSongCurrent(song) && this.player.playing;
  }

  sortDir(property: string) {
    if (this.sortedBy === property) {
      return 1;
    } else if (this.sortedBy === '!' + property) {
      return -1;
    }
    return 0;
  }

  sortBy(property: string) {
    let reverse = this.sortedBy === property;
    this.songs.sort(this.comparator.property(property, reverse));
    if (reverse) {
      this.sortedBy = '!' + property;
    } else {
      this.sortedBy = property;
    }
  }

}
