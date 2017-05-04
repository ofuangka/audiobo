import { Component, OnInit } from '@angular/core';

import { MdDialog } from '@angular/material';

import { QueueService, LibraryService, PlayerService, ComparatorService, ErrorService } from '../services';
import { Song } from '../domain/song';
import { LibrarySetupDialogComponent } from '../library-setup-dialog/library-setup-dialog.component';

@Component({
  selector: 'song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

  loadingSongs: boolean;
  numSongsPerPage = 100;
  songOffset = 0;
  songs: Song[] = [];
  sortedBy: string;
  
  get filteredSongs() {
    return this.songs.slice(this.songOffset, this.songOffset + this.numSongsPerPage);
  }

  constructor(private queue: QueueService, private library: LibraryService, private player: PlayerService, private comparator: ComparatorService, private dialog: MdDialog, private error: ErrorService) { }

  ngOnInit() {
    this.loadingSongs = true;
    this.library.songsReady.then(songs => {
      for (let song of songs) {
        this.songs.push(song);
      }
      this.sortBy('title');
    }).catch(this.error.getGenericFailureFn('Song service is unavailable.')).then(() => this.loadingSongs = false);
  }

  addToQueue(song: Song) {
    if (this.queue.isEmpty()) {
      this.player.load(song);
    }
    this.queue.add(song);
  }

  getAlbumTitle(song: Song): string {
    return this.library.albumMap[song.albumId].title;
  }

  handleSongClick(song: Song) {
  }

  isSongCurrent(song: Song): boolean {
    return this.queue.current && this.queue.current === song;
  }

  isSongPlaying(song: Song): boolean {
    return this.isSongCurrent(song) && this.player.playing;
  }

  play(song: Song) {
    this.queue.clear();
    this.queue.add(song);
    this.player.autoload(this.queue.current);
  }

  showLibrarySetupDialog() {
    this.dialog.open(LibrarySetupDialogComponent);
  }

  sortBy(property: string) {
    let reverse = property === this.sortedBy;
    if (property === 'album') {
      this.songs.sort(this.comparator.songAlbumTitle(reverse));
    } else {
      this.songs.sort(this.comparator.property(property, reverse));
    }
    if (reverse) {
      this.sortedBy = '!' + property;
    } else {
      this.sortedBy = property;
    }
  }

  sortDir(property): number {
    if (this.sortedBy === property) {
      return 1;
    } else if (this.sortedBy === '!' + property) {
      return -1;
    }
    return 0;
  }
}
