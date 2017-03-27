import { Component, OnInit } from '@angular/core';

import { QueueService, LibraryService, PlayerService, ComparatorService } from '../services';
import { Song } from '../domain/song';

@Component({
  selector: 'song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

  songs: Song[] = [];
  sortedBy: string;
  filteredSongs: Song[] = [];

  constructor(private queue: QueueService, private library: LibraryService, private player: PlayerService, private comparator: ComparatorService) { }

  ngOnInit() {
    for (let id of Object.keys(this.library.songs)) {
      this.songs.push(this.library.songs[id]);
      this.filteredSongs.push(this.library.songs[id]);
      this.sortBy('title');
    }
  }

  addToQueue(song: Song) {
    this.queue.add(song);
  }

  getAlbumTitle(song: Song): string {
    return this.library.albums[song.albumId].title;
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

  sortBy(property: string) {
    let reverse = property === this.sortedBy;
    if (property === 'album') {
      this.filteredSongs.sort(this.comparator.songAlbumTitle(reverse));
    } else {
      this.filteredSongs.sort(this.comparator.property(property, reverse));
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
