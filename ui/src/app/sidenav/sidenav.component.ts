import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { LibrarySetupComponent } from '../library-setup/library-setup.component';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }

  showLibrarySetup() {
    this.dialog.open(LibrarySetupComponent);
  }

}
