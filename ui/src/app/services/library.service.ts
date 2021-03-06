import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

import { Song } from '../domain/song';
import { Album } from '../domain/album';

const REFRESH_POLLING_INTERVAL = 30000;

@Injectable()
export class LibraryService {

  private refreshComplete = new Subject();

  albums: Album[] = [];
  albumMap: { [id: string]: Album } = {};
  songs: Song[] = [];
  songMap: { [id: string]: Song } = {};
  albumsReady: Promise<any>;
  songsReady: Promise<any>;
  refreshing = false;
  refreshComplete$ = this.refreshComplete.asObservable();
  refreshInterval;

  get numSongs() {
    return this.songs.length;
  }

  constructor(private http: Http) {
    this.requestData();
  }

  beginRefreshing() {
    this.refreshing = true;
    this.refreshInterval = setTimeout(() => {
      this.http.get('/api/library-status').toPromise().then(response => response.json()).then(this.handleLibraryStatus.bind(this));
    }, REFRESH_POLLING_INTERVAL);
  }

  private cacheAlbums(rawAlbums: any[]) {

    /* create an array and a map of albums */
    for (let rawAlbum of rawAlbums) {
      let newAlbum = new Album();
      newAlbum.id = rawAlbum.id;
      newAlbum.artist = rawAlbum.artist;
      newAlbum.title = rawAlbum.title;
      newAlbum.songIds = rawAlbum.songIds;
      this.albums.push(newAlbum);
      this.albumMap[rawAlbum.id] = newAlbum;
    }
    return this.albums;
  }

  private cacheSongs(rawSongs: any[]) {

    /* create an array and map of songs */
    for (let rawSong of rawSongs) {
      let newSong = new Song();
      newSong.id = rawSong.id;
      newSong.albumId = rawSong.albumId;
      newSong.artist = rawSong.artist;
      newSong.duration = rawSong.duration;
      newSong.title = rawSong.title;
      newSong.track = rawSong.track;
      this.songs.push(newSong);
      this.songMap[rawSong.id] = newSong;
    }
    return this.songs;
  }

  private handleLibraryStatus(result) {
    if (result) {
      this.requestData().then(() => {
        this.refreshing = false;
        this.refreshComplete.next();
      });
    } else {
      setTimeout(this.handleLibraryStatus.bind(this), REFRESH_POLLING_INTERVAL);
    }
  }

  private requestData() {
    this.albumsReady = this.http.get('/api/albums').toPromise().then(response => response.json()).then(this.cacheAlbums.bind(this));
    this.songsReady = this.http.get('/api/songs').toPromise().then(response => response.json()).then(this.cacheSongs.bind(this));
    return Promise.all([this.albumsReady, this.songsReady]);
  }

}
