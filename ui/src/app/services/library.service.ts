import { Injectable } from '@angular/core';

import { Song } from '../domain/song';

@Injectable()
export class LibraryService {
  songs: [Song] = [
    {
      id: 'http://192.168.1.26:4200/30%20Seconds%20to%20Mars/A%20Beautiful%20Lie/003%20-%20The%20Kill.mp3',
      track: 3,
      title: 'The Kill',
      artist: '30 Seconds to Mars',
      album: 'A Beautiful Lie',
      duration: 231
    },
    {
      id: 'http://192.168.1.26:4200/Anberlin/Never%20Take%20Friendship%20Personal/008%20-%20The%20Feel%20Good%20Drag.mp3',
      track: 8,
      title: 'Feel Good Drag',
      artist: 'Anberlin',
      album: 'Never Take Friendship Personal',
      duration: 204

    },
    {
      id: 'http://192.168.1.26:4200/Anastacia/Anastacia/002%20-%20Left%20Outside%20Alone.mp3',
      track: 2,
      title: 'Left Outside Alone',
      artist: 'Anastacia',
      album: 'Anastacia',
      duration: 257
    },
    {
      id: 'http://192.168.1.26:4200/As%20Tall%20as%20Lions/As%20Tall%20as%20Lions/002%20-%20Song%20for%20Luna.mp3',
      track: 2,
      title: 'Song For Luna',
      artist: 'As Tall as Lions',
      album: 'As Tall as Lions',
      duration: 224
    },
    {
      id: "http://192.168.1.26:4200/Islands/Arm's%20Way/001%20-%20The%20Arm.mp3",
      track: 1,
      title: 'The Arm',
      artist: 'Islands',
      album: "Arm's Way",
      duration: 338
    },
    {
      id: 'http://192.168.1.26:4200/Klaxons/Myths%20of%20the%20Near%20Future/003%20-%20Golden%20Skans.mp3',
      track: 3,
      title: 'Golden Skans',
      artist: 'Klaxons',
      album: 'Myths of the Near Future',
      duration: 338
    }
  ];

  constructor() { }

  getRandomSong(): Song {
    return this.songs[Math.round(Math.floor(Math.random() * this.songs.length))];
  }

}
