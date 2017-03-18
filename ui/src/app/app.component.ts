import { Component, OnInit } from '@angular/core';

import { MdDialog, MdDialogRef } from '@angular/material';

import { SecurityService } from './security.service';
import { AboutDialogComponent } from './about-dialog/about-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private security: SecurityService, public dialog: MdDialog) { }
  ngOnInit() {
  }
  showAbout = function () {
    let dialogRef = this.dialog.open(AboutDialogComponent);
  }
}
