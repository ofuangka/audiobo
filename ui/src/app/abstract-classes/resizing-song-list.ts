import { ViewChild, ElementRef } from '@angular/core';

import { NotifyingView } from './notifying-view';

const PADDING = 20;

export abstract class ResizingSongList extends NotifyingView {

  @ViewChild('songTableContainer')
  songTableContainerViewChild: ElementRef;

  @ViewChild('songTable')
  songTableViewChild: ElementRef;

  @ViewChild('songTableStatus')
  songTableStatusViewChild: ElementRef;

  @ViewChild('songTableControls')
  songTableControlsViewChild: ElementRef;

  abstract adjustColumnSizes(ratio: number);

  adjustTableSize() {
    let statusWidth = this.songTableStatusViewChild.nativeElement.offsetWidth,
      controlsWidth = this.songTableControlsViewChild.nativeElement.offsetWidth,
      tableWidth = this.songTableViewChild.nativeElement.offsetWidth - statusWidth - controlsWidth,
      targetWidth = this.songTableContainerViewChild.nativeElement.offsetWidth - statusWidth - controlsWidth,
      ratio = targetWidth / tableWidth;
      this.adjustColumnSizes(ratio);
  }

  handleWindowResize(event: Event) {
    this.adjustTableSize();
  }
}