import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { LibraryService, ComparatorService, QueueService, PlayerService, BackgroundColorService, ErrorService } from '../services';
import { Song, Album } from '../domain';
import { ResizingSongList } from '../abstract-classes/resizing-song-list';

const PADDING = 20;

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent extends ResizingSongList implements OnInit {

  @ViewChild('songTableTrack')
  songTableTrackViewChild: ElementRef;

  album: Album;
  loadingAlbum: boolean;
  totalDuration: number;
  songs: Song[];
  sortedBy: string;
  trackWidth = 'auto';
  titleWidth = 'auto';
  artistWidth = 'auto';
  durationWidth = 'auto';


  get playing() {
    return this.player.playing;
  }
  get loading() {
    return this.player.loading;
  }

  constructor(private route: ActivatedRoute, private library: LibraryService, private comparator: ComparatorService, private queue: QueueService, private player: PlayerService, private backgroundColor: BackgroundColorService, private error: ErrorService) {
    super();
  }

  ngOnInit() {
    this.loadingAlbum = true;
    Promise.all([
      this.initSongs(),
      this.viewInitialized
    ]).then(() => {
      setTimeout(this.adjustTableSize.bind(this));
    }).catch(this.error.getGenericFailureFn('There was a problem initializing the view.')).then(() => this.loadingAlbum = false);
  }

  addAlbumToQueue() {
    for (let song of this.songs) {
      this.addToQueue(song);
    }
  }

  addToQueue(song: Song) {
    if (this.queue.isEmpty()) {
      this.player.load(song);
    }
    this.queue.add(song);
  }

  adjustColumnSizes(ratio: number) {
    let newTitleWidth = Math.floor(this.songTableTitleViewChild.nativeElement.offsetWidth * ratio),
      newArtistWidth = Math.floor(this.songTableArtistViewChild.nativeElement.offsetWidth * ratio);
    this.titleWidth = (newTitleWidth - PADDING) + 'px';
    this.artistWidth = (newArtistWidth - PADDING) + 'px';
  }

  getBackgroundColor() {
    return this.backgroundColor.get(this.album.title);
  }

  getStaticColumnWidths(): number {
    let trackWidth = this.songTableTrackViewChild.nativeElement.offsetWidth;
    return super.getStaticColumnWidths() + trackWidth;
  }

  handleAlbumArtClick() {

  }

  handleSongClick() {

  }

  initSongs() {
    return Promise.all([this.library.albumsReady.catch(this.error.getGenericFailureFn('There was a problem retrieving albums.')),
      this.library.songsReady.catch(this.error.getGenericFailureFn('There was a problem retrieving songs.'))]).then(() => {
        let albumId = this.route.snapshot.params['albumId']
        this.album = this.library.albumMap[albumId];
        this.totalDuration = 0;
        this.songs = [];
        for (let songId of this.album.songIds) {
          let song = this.library.songMap[songId];
          this.songs.push(song);
          this.totalDuration += song.duration;
        }
        this.sortBy('track');
      }).catch(this.error.getGenericFailureFn('There was a problem with the song data.'));
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
