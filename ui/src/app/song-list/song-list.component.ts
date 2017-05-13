import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { MdDialog } from '@angular/material';

import { Subject } from 'rxjs/Subject';

import { QueueService, LibraryService, PlayerService, ComparatorService, ErrorService } from '../services';
import { Song } from '../domain/song';
import { LibrarySetupDialogComponent } from '../library-setup-dialog/library-setup-dialog.component';
import { ResizingSongList } from '../abstract-classes/resizing-song-list';

function isNotDisplayed(elementRef: ElementRef): boolean {
  return elementRef.nativeElement.style.display === 'none';
}

const DEBOUNCE_TIME = 300,
  PAGINATOR_THRESHOLD = 3,
  VIEW_TIMEOUT = 30000,
  PADDING = 20;

@Component({
  selector: 'song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent extends ResizingSongList implements OnInit {

  @ViewChild('songTableTitle')
  songTableTitleViewChild: ElementRef;

  @ViewChild('songTableArtist')
  songTableArtistViewChild: ElementRef;

  @ViewChild('songTableAlbum')
  songTableAlbumViewChild: ElementRef;

  @ViewChild('songTableDuration')
  songTableDurationViewChild: ElementRef;

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
  titleWidth = 'auto';
  artistWidth = 'auto';
  albumWidth = 'auto';
  durationWidth = 'auto';
  

  get currentPage() {
    return (this.songOffset / this.numSongsPerPage) + 1;
  }
  get numSongs() {
    return this.songs.length;
  }
  get paginatedSongs() {
    return this.filteredSongs.slice(this.songOffset, this.songOffset + this.numSongsPerPage);
  }

  constructor(private queue: QueueService, private library: LibraryService, private player: PlayerService, private comparator: ComparatorService, private dialog: MdDialog, private error: ErrorService) {
    super();
  }

  ngOnInit() {
    this.loadingSongs = true;
    this.filterQueryChange$.subscribe(this.filterSongs.bind(this));
    Promise.all([this.initSongs(), this.viewInitializedResolve]).then(() => {
      setTimeout(this.adjustTableSize.bind(this));
    }).catch(this.error.getGenericFailureFn('A rendering issue occurred.')).then(() => this.loadingSongs = false);
  }

  addToQueue(song: Song) {
    if (this.queue.isEmpty()) {
      this.player.load(song);
    }
    this.queue.add(song);
  }

  adjustColumnSizes(ratio: number) {
    let newTitleWidth = Math.floor(this.songTableTitleViewChild.nativeElement.offsetWidth * ratio),
      newArtistWidth = Math.floor(this.songTableArtistViewChild.nativeElement.offsetWidth * ratio),
      newAlbumWidth = Math.floor(this.songTableAlbumViewChild.nativeElement.offsetWidth * ratio),
      newDurationWidth = Math.floor(this.songTableDurationViewChild.nativeElement.offsetWidth * ratio);
    this.titleWidth = (newTitleWidth - PADDING) + 'px';
    this.artistWidth = (newArtistWidth - PADDING) + 'px';
    this.albumWidth = (newAlbumWidth - PADDING) + 'px';
    this.durationWidth = (newDurationWidth - PADDING) + 'px';
  }

  clearTableSize() {
    this.titleWidth = 'auto';
    this.artistWidth = 'auto';
    this.albumWidth = 'auto';
    this.durationWidth = 'auto';
  }

  filterSongs(query: string) {
    this.filteredSongs = [];
    for (let song of this.songs) {
      if (song.title && song.title.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
        this.filteredSongs.push(song);
      }
    }
    this.setUpPagination();
    this.goToPage(1);
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
    this.clearTableSize();
    setTimeout(this.adjustTableSize.bind(this));
  }

  goToPreviousPage() {
    this.goToPage(this.currentPage - 1);
  }

  handleFilterQueryChange(newValue: string) {
    this.filterQueryChange.next(newValue);
  }

  handleSongClick(song: Song) {
  }

  private initSongs() {
    return this.library.songsReady.then(songs => {
      for (let song of songs) {
        this.songs.push(song);
        this.filteredSongs.push(song);
      }
      this.setUpPagination();
      this.sortBy('title');
    }).catch(this.error.getGenericFailureFn('Song service is unavailable.'));
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
