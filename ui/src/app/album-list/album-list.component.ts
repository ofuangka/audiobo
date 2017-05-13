import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { Subject } from 'rxjs/Subject';

import { LibraryService, QueueService, PlayerService, ComparatorService, BackgroundColorService, ErrorService } from '../services';
import { Album } from '../domain/album';
import { LibrarySetupDialogComponent } from '../library-setup-dialog/library-setup-dialog.component';
import { NotifyingView } from '../abstract-classes/notifying-view';

const ALBUM_WIDTH = 182,
  DEBOUNCE_TIME = 300,
  NUM_ALBUMS_PER_PAGE = 50,
  PAGINATOR_THRESHOLD = 3;

@Component({
  selector: 'album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent extends NotifyingView implements OnInit {

  @ViewChild("albums")
  albumsViewChild: ElementRef;

  private filterQueryChange = new Subject();

  albumOffset = 0;
  albums: Album[] = [];
  filteredAlbums: Album[] = [];
  filterQuery: string;
  filterQueryChange$ = this.filterQueryChange.asObservable().debounceTime(DEBOUNCE_TIME).distinctUntilChanged();
  loadingAlbums: boolean;
  numAlbumsPerPage = NUM_ALBUMS_PER_PAGE;
  pages: number[] = [];
  paginatorThreshold = PAGINATOR_THRESHOLD;
  remainderAlbums: boolean[] = [];
  sortedBy: string;

  get currentPage() {
    return (this.albumOffset / this.numAlbumsPerPage) + 1;
  }
  get paginatedAlbums() {
    return this.filteredAlbums.slice(this.albumOffset, this.albumOffset + this.numAlbumsPerPage);
  }
  get loading() {
    return this.player.loading;
  }
  get numAlbums() {
    return this.albums.length;
  }
  get playing() {
    return this.player.playing;
  }

  constructor(private library: LibraryService, private queue: QueueService, private player: PlayerService, private comparator: ComparatorService, private router: Router, private backgroundColor: BackgroundColorService, private dialog: MdDialog, private error: ErrorService) {
    super();
  }

  ngOnInit() {
    this.loadingAlbums = true;
    this.filterQueryChange$.subscribe(this.filterAlbums.bind(this));
    Promise.all([
      this.initAlbums(),
      this.viewInitialized
    ]).then(() => {
      this.setUpRemainderAlbums();
    }).catch(this.error.getGenericFailureFn('A rendering issue occurred.')).then(() => { this.loadingAlbums = false});
  }

  addAlbumToQueue(album: Album) {
    let orderedSongs = this.getAlbumSongsInOrder(album);
    for (let song of orderedSongs) {
      if (this.queue.isEmpty()) {
        this.player.load(song);
      }
      this.queue.add(song);
    }
  }

  filterAlbums(query: string) {
    this.filteredAlbums = [];
    for (let album of this.albums) {
      if (album.title && album.title.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
        this.filteredAlbums.push(album);
      }
    }
    this.setUpRemainderAlbums();
    this.setUpPagination();
    this.goToPage(1);
  }

  private getAlbumSongsInOrder(album: Album) {
    let ret = [];
    for (let songId of album.songIds) {
      ret.push(this.library.songMap[songId]);
    }
    ret.sort(this.comparator.property('track', false));
    return ret;
  }

  getBackgroundColor(album: Album) {
    return this.backgroundColor.get(album.title);
  }

  getPageLabel(page: number): string {
    var ret = `${page}`;
    if (page !== 1 && page !== this.pages.length && (page === this.currentPage - this.paginatorThreshold + 1
      || page === this.currentPage + this.paginatorThreshold - 1)) {
      ret = '...';
    }
    return ret;
  }

  goToAlbumDetails(album: Album) {
    this.router.navigate(['library', 'albums', album.id]);
  }

  goToNextPage() {
    this.goToPage(this.currentPage + 1);
  }

  goToPage(page: number) {
    this.albumOffset = (page - 1) * this.numAlbumsPerPage;
    this.setUpRemainderAlbums();
  }

  goToPreviousPage() {
    this.goToPage(this.currentPage - 1);
  }

  handleAlbumArtClick(album: Album) {

  }

  handleFilterQueryChange(newValue: string) {
    this.filterQueryChange.next(newValue);
  }

  handleWindowResize(event: Event) {
    this.setUpRemainderAlbums();
  }

  private initAlbums() {
    return this.library.albumsReady.then(albums => {
      for (let album of albums) {
        this.albums.push(album);
        this.filteredAlbums.push(album);
      }
      this.setUpPagination();
      this.sortBy('title');
    }).catch(this.error.getGenericFailureFn('Album service is unavailable.'))
  }

  isAlbumCurrent(album: Album): boolean {
    return (this.queue.current) ? this.library.albumMap[this.queue.current.albumId] === album : false;
  }

  isAlbumPlaying(album: Album): boolean {
    return this.isAlbumCurrent(album) && this.playing;
  }

  isNextDisabled(): boolean {
    return this.albumOffset >= this.numAlbums - this.numAlbumsPerPage;
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
    return this.albumOffset === 0;
  }

  playAlbum(album: Album) {
    this.queue.clear();
    this.addAlbumToQueue(album);
    this.player.autoload(this.queue.current);
  }

  setUpPagination() {
    this.pages = [];
    for (let i = 0; i < this.filteredAlbums.length / this.numAlbumsPerPage; i++) {
      this.pages.push(i + 1);
    }
  }

  setUpRemainderAlbums() {
    let numPerRow = Math.floor(this.albumsViewChild.nativeElement.offsetWidth / ALBUM_WIDTH),
      remainder = this.paginatedAlbums.length % numPerRow,
      numToAdd = (remainder === 0) ? 0 : numPerRow - remainder;
    this.remainderAlbums = [];
    for (let i = 0; i < numToAdd; i++) {
      this.remainderAlbums.push(true);
    }
  }

  showLibrarySetupDialog() {
    this.dialog.open(LibrarySetupDialogComponent);
  }

  sortBy(property: string) {
    let reverse = property === this.sortedBy;
    this.albums.sort(this.comparator.property(property, reverse));
    this.filteredAlbums.sort(this.comparator.property(property, reverse));
    if (reverse) {
      this.sortedBy = '!' + property;
    } else {
      this.sortedBy = property;
    }
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

}
