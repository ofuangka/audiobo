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

  @ViewChild('songTableTitle')
  songTableTitleViewChild: ElementRef;

  @ViewChild('songTableArtist')
  songTableArtistViewChild: ElementRef;

  @ViewChild('songTableDuration')
  songTableDurationViewChild: ElementRef;

  abstract adjustColumnSizes(ratio: number);

  adjustTableSize() {
    let tableWidth = this.songTableViewChild.nativeElement.offsetWidth - this.getStaticColumnWidths(),
      targetWidth = this.songTableContainerViewChild.nativeElement.offsetWidth - this.getStaticColumnWidths(),
      ratio = targetWidth / tableWidth;
      this.adjustColumnSizes(ratio);
  }

  getStaticColumnWidths(): number {
    let statusWidth = this.songTableStatusViewChild.nativeElement.offsetWidth,
      controlsWidth = this.songTableControlsViewChild.nativeElement.offsetWidth,
      durationWidth = this.songTableDurationViewChild.nativeElement.offsetWidth;
    return statusWidth + controlsWidth + durationWidth;
  }

  handleWindowResize(event: Event) {
    this.adjustTableSize();
  }
}