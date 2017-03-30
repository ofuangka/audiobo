import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Title } from '@angular/platform-browser';

import { MdDialog } from '@angular/material';

import { SecurityService, QueueService } from './services';
import { AboutDialogComponent } from './about-dialog/about-dialog.component';
import { Song } from './domain';

@Component({
  animations: [
    trigger('flyInOut', [
      state('in', style({
        transform: 'translateY(0)'
      })),
      transition('void => *', [
        style({ transform: 'translateY(100%)' }), animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s ease-out', style({ transform: 'translateY(100%)' }))
      ])
    ])
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private security: SecurityService, public dialog: MdDialog, private queue: QueueService, private title: Title) { }

  ngOnInit() {
    this.queue.currentChanged$.subscribe((newSong: Song) => this.title.setTitle(newSong ? newSong.title + ' - ' + newSong.artist : 'Audiobo'));
  }

  isQueueEmpty() {
    return this.queue.isEmpty();
  }

  showAbout = function () {
    this.dialog.open(AboutDialogComponent);
  }
}
