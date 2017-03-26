import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { LibraryService, QueueService, PlayerService, ComparatorService } from '../services';
import { Album } from '../domain/album';

@Component({
  selector: 'album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit, AfterViewInit {

  @ViewChild("albums")
  albumsViewChild: ElementRef

  albums: Album[] = [];
  filteredAlbums: Album[] = [];
  remainderAlbums: boolean[] = [];
  sortedBy: string;

  constructor(private library: LibraryService, private queue: QueueService, private player: PlayerService, private comparator: ComparatorService) { }

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
    for (let songId of album.songIds) {
      this.queue.add(this.library.songs[songId]);
    }
  }

  goToAlbumDetails(album: Album) {

  }

  handleWindowResize(event: Event) {
    this.setUpRemainderAlbums();
  }

  playAlbum(album: Album) {
    this.queue.clear();
    this.addAlbumToQueue(album);
    this.player.autoload(this.queue.currentSong);
  }

  setUpRemainderAlbums() {
    let ALBUM_WIDTH = 182,
      numPerRow = Math.floor(this.albumsViewChild.nativeElement.offsetWidth / ALBUM_WIDTH),
      remainder = numPerRow - (this.albums.length % numPerRow);
    this.remainderAlbums = [];
    for (let i = 0; i < remainder; i++) {
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

}
