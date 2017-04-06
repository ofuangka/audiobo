import { Component, OnInit } from '@angular/core';
import { MdDialog, MdSidenav } from '@angular/material';

import { LibrarySetupDialogComponent } from '../library-setup-dialog/library-setup-dialog.component';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(public dialog: MdDialog, private sidenav: MdSidenav) { }

  ngOnInit() {
  }

  showLibrarySetupDialog() {
    this.dialog.open(LibrarySetupDialogComponent).afterClosed().subscribe((userSelectedRefresh) => {
      if (userSelectedRefresh) {
        this.sidenav.close();
      }
    });
  }

}
