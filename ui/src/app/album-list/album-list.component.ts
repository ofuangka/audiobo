import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { LibraryService, QueueService, PlayerService, ComparatorService, BackgroundColorService, ErrorService } from '../services';
import { Album } from '../domain/album';
import { LibrarySetupDialogComponent } from '../library-setup-dialog/library-setup-dialog.component';

const ALBUM_WIDTH = 182,
  VIEW_TIMEOUT = 30000;

@Component({
  selector: 'album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit, AfterViewInit {

  @ViewChild("albums")
  albumsViewChild: ElementRef;

  albumOffset = 0;
  albums: Album[] = [];
  loadingAlbums: boolean;
  numAlbumsPerPage = 2;
  pages: number[] = [];
  paginatorThreshold = 3;
  remainderAlbums: boolean[] = [];
  sortedBy: string;
  viewInitialized = new Promise((resolve, reject) => {
    this.viewInitializedResolve = resolve;
    setTimeout(() => {
      reject(new Error('View did not initialize before timeout.'));
    }, VIEW_TIMEOUT);
  });
  private viewInitializedResolve;

  get currentPage() {
    return (this.albumOffset / this.numAlbumsPerPage) + 1;
  }

  get filteredAlbums() {
    return this.albums.slice(this.albumOffset, this.albumOffset + this.numAlbumsPerPage);
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

  constructor(private library: LibraryService, private queue: QueueService, private player: PlayerService, private comparator: ComparatorService, private router: Router, private backgroundColor: BackgroundColorService, private dialog: MdDialog, private error: ErrorService) { }

  ngOnInit() {
    this.loadingAlbums = true;
    Promise.all([
      this.initAlbums(),
      this.viewInitialized
    ]).then(() => {
      this.setUpRemainderAlbums();
      this.loadingAlbums = false
    });
  }

  ngAfterViewInit() {
    this.viewInitializedResolve();
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
    if (page === this.currentPage - this.paginatorThreshold + 1
        || page === this.currentPage + this.paginatorThreshold - 1) {
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

  handleWindowResize(event: Event) {
    this.setUpRemainderAlbums();
  }

  private initAlbums() {
    return this.library.albumsReady.then(albums => {
      for (let album of albums) {
        this.albums.push(album);
      }
      for (let i = 0; i < albums.length / this.numAlbumsPerPage; i++) {
        this.pages.push(i + 1);
      }
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
    return this.albumOffset === this.numAlbums - this.numAlbumsPerPage;
  }

  isPageActive(page: number): boolean {
    return page === this.currentPage;
  }

  isPageVisible(page: number): boolean {
    var ret = false;
    if (page === 1 || page === this.pages.length) {
      ret = true;
    } else if (page === this.currentPage
        || page > this.currentPage - this.paginatorThreshold
        || page < this.currentPage + this.paginatorThreshold) {
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

  setUpRemainderAlbums() {
    let numPerRow = Math.floor(this.albumsViewChild.nativeElement.offsetWidth / ALBUM_WIDTH),
      remainder = this.filteredAlbums.length % numPerRow,
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
