import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'now-playing-controls',
  templateUrl: './now-playing-controls.component.html',
  styleUrls: ['./now-playing-controls.component.css']
})
export class NowPlayingControlsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

  toggleQueue() {

  }

  previous() {}
  next() {}
  playPauseRandom() {}
  like() {}

}
