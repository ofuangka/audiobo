import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  albums = [
    { id: '0', title: 'Tommy', artist: 'The Who', year: '1971' },
    { id: '1', title: 'Enter the Gungeon', artist: 'Doseone', year: '2016' },
    { id: '2', title: 'FTL', artist: 'Ben Prunty', year: '2012' },
    { id: '3', title: 'Shovel Knight The Definitive Soundtrack', artist: 'Jake Kaufman', year: '2014' },
    { id: '4', title: 'Tommy', artist: 'The Who', year: '1971' },
    { id: '5', title: 'Enter the Gungeon', artist: 'Doseone', year: '2016' },
    { id: '6', title: 'FTL', artist: 'Ben Prunty', year: '2012' },
    { id: '7', title: 'Shovel Knight The Definitive Soundtrack', artist: 'Jake Kaufman', year: '2014' },

  ];
  playQueue = [
    { id: '0', title: 'The Last Man', artist: 'Clint Mansell', duration: '6:09' },
    { id: '1', title: 'Holy Dread!', artist: 'Clint Mansell', duration: '3:51' }
  ];
  isTouchDevice = function () {
    var el = document.createElement('div');
    el.setAttribute('ongesturestart', 'return;');
    return typeof el['ongesturestart'] === 'function';
  }
  isPlaying = function (track) {
    return track.id === '1';
  }
}
