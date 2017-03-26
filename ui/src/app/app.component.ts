import { Component } from '@angular/core';

import { MdDialog } from '@angular/material';

import { SecurityService } from './services';
import { AboutDialogComponent } from './about-dialog/about-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private security: SecurityService, public dialog: MdDialog) { }
  showAbout = function () {
    this.dialog.open(AboutDialogComponent);
  }
}
