import { Injectable } from '@angular/core';

import { Song } from '../domain/song';
import { Album } from '../domain/album';
import { RandomService } from './random.service';

@Injectable()
export class LibraryService {
  albums: { [id: string]: Album } = {
    '0': {
      title: 'A Beautiful Lie',
      artist: '30 Seconds to Mars',
      songIds: [
        '0'
      ]
    },
    '1': {
      title: 'Never Take Friendship Personal',
      artist: 'Anberlin',
      songIds: [
        '1'
      ]
    },
    '2': {
      title: 'Anastacia',
      artist: 'Anastacia',
      songIds: [
        '2'
      ]
    },
    '3': {
      title: 'As Tall as Lions',
      artist: 'As Tall as Lions',
      songIds: [
        '3',
        '6'
      ]
    },
    '4': {
      title: "Arm's Way",
      artist: 'Islands',
      songIds: [
        '4'
      ]
    },
    '5': {
      title: 'iii',
      artist: 'Miike Snow',
      songIds: [
        '5'
      ]
    }
  };
  songs: { [id: string]: Song } = {
    '0': {
      url: 'http://72.182.62.242:4200/30%20Seconds%20to%20Mars/A%20Beautiful%20Lie/003%20-%20The%20Kill.mp3',
      track: 3,
      title: 'The Kill',
      artist: '30 Seconds to Mars',
      albumId: '0',
      duration: 231
    },
    '1': {
      url: 'http://72.182.62.242:4200/Anberlin/Never%20Take%20Friendship%20Personal/008%20-%20The%20Feel%20Good%20Drag.mp3',
      track: 8,
      title: 'Feel Good Drag',
      artist: 'Anberlin',
      albumId: '1',
      duration: 204
    },
    '2': {
      url: 'http://72.182.62.242:4200/Anastacia/Anastacia/002%20-%20Left%20Outside%20Alone.mp3',
      track: 2,
      title: 'Left Outside Alone',
      artist: 'Anastacia',
      albumId: '2',
      duration: 257
    },
    '3': {
      url: 'http://72.182.62.242:4200/As%20Tall%20as%20Lions/As%20Tall%20as%20Lions/002%20-%20Song%20for%20Luna.mp3',
      track: 2,
      title: 'Song For Luna',
      artist: 'As Tall as Lions',
      albumId: '3',
      duration: 224
    },
    '4': {
      url: "http://72.182.62.242:4200/Islands/Arm's%20Way/001%20-%20The%20Arm.mp3",
      track: 1,
      title: 'The Arm',
      artist: 'Islands',
      albumId: '4',
      duration: 338
    },
    '5': {
      url: 'http://72.182.62.242:4200/Miike%20Snow/iii/03%20-%20Genghis%20Khan.mp3',
      track: 3,
      title: 'Genghis Khan',
      artist: 'Miike Snow',
      albumId: '5',
      duration: 211
    },
    '6': {
      url: 'http://72.182.62.242:4200/As%20Tall%20as%20Lions/As%20Tall%20as%20Lions/001%20-%20Stab%20City.mp3',
      track: 1,
      title: 'Stab City',
      artist: 'As Tall as Lions',
      albumId: '3',
      duration: 215
    }
  };
  get numSongs() {
    return Object.keys(this.songs).length;
  }

  constructor(private random: RandomService) {

  }

  getRandomSong(): Song {
    return this.songs[this.random.next(this.numSongs)];
  }

}
