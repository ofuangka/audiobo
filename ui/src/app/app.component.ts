import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Title } from '@angular/platform-browser';

import { MdDialog, MdDialogConfig } from '@angular/material';

import { SecurityService, QueueService, LibraryService, ErrorService } from './services';
import { Song } from './domain';
import { AboutDialogComponent } from './about-dialog/about-dialog.component';
import { ErrorMessageDialogComponent } from './error-message-dialog/error-message-dialog.component';

@Component({
  animations: [
    trigger('flyInOut', [
      state('in', style({
        transform: 'translateY(0)'
      })),
      transition('void => *', [
        style({ transform: 'translateY(100%)' }), animate('0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)')
      ]),
      transition('* => void', [
        animate('0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)', style({ transform: 'translateY(100%)' }))
      ])
    ])
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  get refreshing() {
    return this.library.refreshing;
  }

  constructor(private security: SecurityService, public dialog: MdDialog, private queue: QueueService, private title: Title, private library: LibraryService, private error: ErrorService) { }

  ngOnInit() {
    this.queue.currentChanged$.subscribe((newSong: Song) => this.title.setTitle(newSong ? newSong.title + ' - ' + newSong.artist : 'Audiobo'));
    this.error.message$.subscribe(this.showErrorDialog.bind(this));
  }

  isQueueEmpty() {
    return this.queue.isEmpty();
  }

  showAboutDialog() {
    this.dialog.open(AboutDialogComponent);
  }

  showErrorDialog(errorMessage) {
    let config = new MdDialogConfig();
    config.data = {
      errorMessage: errorMessage
    };
    this.dialog.open(ErrorMessageDialogComponent, config);
  }
}
