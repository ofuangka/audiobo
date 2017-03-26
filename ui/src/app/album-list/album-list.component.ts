import { Component, OnInit } from '@angular/core';

import { CapabilitiesService, LibraryService, QueueService, PlayerService } from '../services';
import { Album } from '../domain/album';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {

  albums: Album[] = [];
  filteredAlbums: Album[] = [];

  constructor(private capabilities: CapabilitiesService, private library: LibraryService, private queue: QueueService, private player: PlayerService) { }

  ngOnInit() {
    for (let id of Object.keys(this.library.albums)) {
      this.albums.push(this.library.albums[id]);
      this.filteredAlbums.push(this.library.albums[id]);
    }
  }

  isTouchDevice() {
    return this.capabilities.isTouchDevice();
  }

  addAlbumToQueue(album: Album) {
    for (let songId of album.songIds) {
      this.queue.add(this.library.songs[songId]);
    }
  }

  goToAlbumDetails(album: Album) {

  }

  playAlbum(album: Album) {
    this.queue.clear();
    this.addAlbumToQueue(album);
    this.player.autoload(this.queue.currentSong);
  }

}
