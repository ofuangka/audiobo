import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'now-playing-controls',
  templateUrl: './now-playing-controls.component.html',
  styleUrls: ['./now-playing-controls.component.css']
})
export class NowPlayingControlsComponent implements OnInit {

  @Output()
  queueToggle: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    
  }

  toggleQueue() {
    this.queueToggle.emit(null);
  }

  previous() {}
  next() {}
  playPauseRandom() {}
  like() {}

}
