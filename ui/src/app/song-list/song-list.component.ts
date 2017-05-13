import { Component, OnInit } from '@angular/core';

import { MdDialog } from '@angular/material';

import { Subject } from 'rxjs/Subject';

import { QueueService, LibraryService, PlayerService, ComparatorService, ErrorService } from '../services';
import { Song } from '../domain/song';
import { LibrarySetupDialogComponent } from '../library-setup-dialog/library-setup-dialog.component';

const DEBOUNCE_TIME = 300,
  PAGINATOR_THRESHOLD = 3;

@Component({
  selector: 'song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

  private filterQueryChange = new Subject();

  filteredSongs: Song[] = [];
  filterQueryChange$ = this.filterQueryChange.asObservable().debounceTime(DEBOUNCE_TIME).distinctUntilChanged();
  loadingSongs: boolean;
  numSongsPerPage = 50;
  pages: number[] = [];
  paginatorThreshold = PAGINATOR_THRESHOLD;
  songOffset = 0;
  songs: Song[] = [];
  sortedBy: string;
  

  get currentPage() {
    return (this.songOffset / this.numSongsPerPage) + 1;
  }
  get numSongs() {
    return this.songs.length;
  }
  get paginatedSongs() {
    return this.filteredSongs.slice(this.songOffset, this.songOffset + this.numSongsPerPage);
  }

  constructor(private queue: QueueService, private library: LibraryService, private player: PlayerService, private comparator: ComparatorService, private dialog: MdDialog, private error: ErrorService) { }

  ngOnInit() {
    this.loadingSongs = true;
    this.filterQueryChange$.subscribe(this.filterSongs.bind(this));
    this.library.songsReady.then(songs => {
      for (let song of songs) {
        this.songs.push(song);
        this.filteredSongs.push(song);
      }
      this.setUpPagination();
      this.sortBy('title');
    }).catch(this.error.getGenericFailureFn('Song service is unavailable.')).then(() => this.loadingSongs = false);
  }

  addToQueue(song: Song) {
    if (this.queue.isEmpty()) {
      this.player.load(song);
    }
    this.queue.add(song);
  }

  filterSongs(query: string) {
    this.filteredSongs = [];
    for (let song of this.songs) {
      if (song.title && song.title.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
        this.filteredSongs.push(song);
      }
    }
    this.setUpPagination();
  }

  getAlbumTitle(song: Song): string {
    return this.library.albumMap[song.albumId].title;
  }

  getPageLabel(page: number): string {
    var ret = `${page}`;
    if (page !== 1 && page !== this.pages.length && (page === this.currentPage - this.paginatorThreshold + 1
      || page === this.currentPage + this.paginatorThreshold - 1)) {
      ret = '...';
    }
    return ret;
  }

  goToNextPage() {
    this.goToPage(this.currentPage + 1);
  }

  goToPage(page: number) {
    this.songOffset = (page - 1) * this.numSongsPerPage;
  }

  goToPreviousPage() {
    this.goToPage(this.currentPage - 1);
  }

  handleFilterQueryChange(newValue: string) {
    this.filterQueryChange.next(newValue);
  }

  handleSongClick(song: Song) {
  }

  isNextDisabled(): boolean {
    return this.songOffset >= this.numSongs - this.numSongsPerPage;
  }

  isPageActive(page: number): boolean {
    return page === this.currentPage;
  }

  isPageVisible(page: number): boolean {
    var ret = false;
    if (page === 1 || page === this.pages.length) {
      ret = true;
    } else if (page === this.currentPage
      || (page > this.currentPage - this.paginatorThreshold && page < this.currentPage + this.paginatorThreshold)) {
      ret = true;
    }
    return ret;
  }

  isPreviousDisabled(): boolean {
    return this.songOffset === 0;
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

  setUpPagination() {
    this.pages = [];
    for (let i = 0; i < this.filteredSongs.length / this.numSongsPerPage; i++) {
      this.pages.push(i + 1);
    }
  }

  showLibrarySetupDialog() {
    this.dialog.open(LibrarySetupDialogComponent);
  }

  sortBy(property: string) {
    let reverse = property === this.sortedBy;
    if (property === 'album') {
      this.songs.sort(this.comparator.songAlbumTitle(reverse));
      this.filteredSongs.sort(this.comparator.songAlbumTitle(reverse));
    } else {
      this.songs.sort(this.comparator.property(property, reverse));
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
