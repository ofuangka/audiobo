import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { MdDialog } from '@angular/material';

import { SecurityService, QueueService } from './services';
import { AboutDialogComponent } from './about-dialog/about-dialog.component';

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
export class AppComponent {

  constructor(private security: SecurityService, public dialog: MdDialog, private queue: QueueService) { }

  isQueueEmpty() {
    return this.queue.isEmpty();
  }

  showAbout = function () {
    this.dialog.open(AboutDialogComponent);
  }
}
