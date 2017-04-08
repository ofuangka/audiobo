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
    },
    '6': {
      title: '21',
      artist: 'Adele',
      songIds: [
        '7'
      ]
    },
    '7': {
      title: 'Mean Everything to Nothing',
      artist: 'Manchester Orchestra',
      songIds: [
        '8'
      ]
    },
    '8': {
      title: 'Mer de noms',
      artist: 'A Perfect Circle',
      songIds: [
        '9'
      ]
    },
    '9': {
      title: 'The Suburbs',
      artist: 'Arcade Fire',
      songIds: [
        '10'
      ]
    },
    '10': {
      title: '23',
      artist: 'Blonde Redhead',
      songIds: [
        '11'
      ]
    },
    '11': {
      title: 'The Complex',
      artist: 'Blue Man Group',
      songIds: [
        '12',
        '13'
      ]
    }
  };
  refreshing = false;
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
    },
    '7': {
      url: 'http://72.182.62.242:4200/Adele/21/001%20-%20Rolling%20In%20The%20Deep.mp3',
      track: 1,
      title: 'Rolling in the Deep',
      artist: 'Adele',
      albumId: '6',
      duration: 235
    },
    '8': {
      url: 'http://72.182.62.242:4200/Manchester%20Orchestra/Mean%20Everything%20to%20Nothing/002%20-%20Shake%20It%20Out.mp3',
      track: 2,
      title: 'Shake It Out',
      artist: 'Manchester Orchestra',
      albumId: '7',
      duration: 222
    },
    '9': {
      url: 'http://72.182.62.242:4200/A%20Perfect%20Circle/Mer%20de%20noms/004%20-%20Judith.mp3',
      track: 4,
      title: 'Judith',
      artist: 'A Perfect Circle',
      albumId: '8',
      duration: 247
    },
    '10': {
      url: 'http://72.182.62.242:4200/Arcade%20Fire/The%20Suburbs/001%20-%20The%20Suburbs.mp3',
      track: 1,
      title: 'The Suburbs',
      artist: 'Arcade Fire',
      albumId: '9',
      duration: 315
    },
    '11': {
      url: 'http://72.182.62.242:4200/Blonde%20Redhead/23/001%20-%2023.mp3',
      track: 1,
      title: '23',
      artist: 'Blonde Redhead',
      albumId: '10',
      duration: 318
    },
    '12': {
      url: 'http://72.182.62.242:4200/Blue%20Man%20Group/The%20Complex/001%20-%20Above.mp3',
      track: 1,
      title: 'Above',
      artist: 'Blue Man Group',
      albumId: '11',
      duration: 166
    },
    '13': {
      url: 'http://72.182.62.242:4200/Blue%20Man%20Group/The%20Complex/012%20-%20The%20Complex.mp3',
      track: 12,
      title: 'The Complex',
      artist: 'Blue Man Group',
      albumId: '11',
      duration: 357
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
