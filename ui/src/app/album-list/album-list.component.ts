import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { LibraryService, QueueService, PlayerService, ComparatorService, BackgroundColorService } from '../services';
import { Album } from '../domain/album';

const ALBUM_WIDTH = 182;

@Component({
  selector: 'album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit, AfterViewInit {

  @ViewChild("albums")
  albumsViewChild: ElementRef;

  albums: Album[] = [];
  filteredAlbums: Album[] = [];
  remainderAlbums: boolean[] = [];
  sortedBy: string;

  get loading() {
    return this.player.loading;
  }
  get playing() {
    return this.player.playing;
  }

  constructor(private library: LibraryService, private queue: QueueService, private player: PlayerService, private comparator: ComparatorService, private router: Router, private backgroundColor: BackgroundColorService) { }

  ngOnInit() {
    for (let id of Object.keys(this.library.albums)) {
      this.albums.push(this.library.albums[id]);
      this.filteredAlbums.push(this.library.albums[id]);
    }
    this.sortBy('title');
  }

  ngAfterViewInit() {
    this.setUpRemainderAlbums();
  }

  addAlbumToQueue(album: Album) {
    let orderedSongs = this.getAlbumSongsInOrder(album);
    for (let song of orderedSongs) {
      this.queue.add(song);
    }
  }

  private getAlbumId(album: Album) {
    for (let id of Object.keys(this.library.albums)) {
      if (album === this.library.albums[id]) {
        return id;
      }
    }
    throw new Error('Could not find album in library');
  }

  private getAlbumSongsInOrder(album: Album) {
    let ret = [];
    for (let songId of album.songIds) {
      ret.push(this.library.songs[songId]);
    }
    ret.sort(this.comparator.property('track', false));
    return ret;
  }

  getBackgroundColor(album: Album) {
    return this.backgroundColor.get(album.title);
  }

  goToAlbumDetails(album: Album) {
    this.router.navigate(['library', 'albums', this.getAlbumId(album)])
  }

  handleAlbumArtClick(album: Album) {

  }

  handleWindowResize(event: Event) {
    this.setUpRemainderAlbums();
  }

  isAlbumCurrent(album: Album): boolean {
    return (this.queue.current) ? this.library.albums[this.queue.current.albumId] === album : false;
  }

  isAlbumPlaying(album: Album): boolean {
    return this.isAlbumCurrent(album) && this.playing;
  }

  playAlbum(album: Album) {
    this.queue.clear();
    this.addAlbumToQueue(album);
    this.player.autoload(this.queue.current);
  }

  setUpRemainderAlbums() {
    let numPerRow = Math.floor(this.albumsViewChild.nativeElement.offsetWidth / ALBUM_WIDTH),
      remainder = this.albums.length % numPerRow,
      numToAdd = (remainder === 0) ? 0 : numPerRow - remainder;
    this.remainderAlbums = [];
    for (let i = 0; i < numToAdd; i++) {
      this.remainderAlbums.push(true);
    }
  }

  sortBy(property: string) {
    let reverse = property === this.sortedBy;
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
