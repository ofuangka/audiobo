import { Component, OnInit } from '@angular/core';

import { QueueService, LibraryService, PlayerService } from '../services';
import { Song } from '../domain/song';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit{
  private selectedSong: Song;
  songs: Song[] = [];
  filteredSongs: Song[] = [];
  letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  constructor(private queue: QueueService, private library: LibraryService, private player: PlayerService) { }

  ngOnInit() {
    for (let id of Object.keys(this.library.songs)) {
      this.songs.push(this.library.songs[id]);
      this.filteredSongs.push(this.library.songs[id]);
    }
  }

  addToQueue(song: Song) {
    this.queue.add(song);
  }

  getAlbumTitle(song: Song): string {
    return this.library.albums[song.albumId].title;
  }

  handleSongClick(song: Song) {
    
  }

  isSongCurrent(song: Song): boolean {
    return this.queue.currentSong && this.queue.currentSong === song;
  }

  isSongPlaying(song: Song): boolean {
    return this.isSongCurrent(song) && this.player.playing;
  }

  play(song: Song) {
    this.queue.clear();
    this.queue.add(song);
    this.player.autoload(this.queue.currentSong);
  }

}
