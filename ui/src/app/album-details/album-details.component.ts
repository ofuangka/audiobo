import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { LibraryService, ComparatorService, QueueService, PlayerService, BackgroundColorService } from '../services';
import { Song, Album } from '../domain';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {

  album: Album;
  totalDuration: number;
  songs: Song[];
  sortedBy: string;

  get playing() {
    return this.player.playing;
  }
  get loading() {
    return this.player.loading;
  }

  constructor(private route: ActivatedRoute, private library: LibraryService, private comparator: ComparatorService, private queue: QueueService, private player: PlayerService, private backgroundColor: BackgroundColorService) { }

  ngOnInit() {
    let albumId = this.route.snapshot.params['albumId']
    this.album = this.library.albums[albumId];
    this.totalDuration = 0;
    this.songs = [];
    for (let songId of this.album.songIds) {
      let song = this.library.songs[songId];
      this.songs.push(song);
      this.totalDuration += song.duration;
    }
    this.songs.sort(this.comparator.property('track', false));
  }

  addAlbumToQueue() {
    for (let song of this.songs) {
      this.queue.add(song);
    }
  }

  getBackgroundColor() {
    return this.backgroundColor.get(this.album.title);
  }

  handleAlbumArtClick() {

  }

  handleSongClick() {

  }

  isAlbumCurrent() {
    return this.queue.current && this.library.albums[this.queue.current.albumId] === this.album;
  }

  isSongCurrent(song: Song): boolean {
    return this.queue.current === song;
  }

  isSongPlaying(song: Song): boolean {
    return this.isSongCurrent(song) && this.player.playing;
  }

  play(song: Song) {
    this.queue.clear();
    this.queue.add(song);
    this.player.autoload(this.queue.current);
  }

  playAlbum() {
    this.queue.clear();
    this.addAlbumToQueue();
    this.player.autoload(this.queue.current);
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
