import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'album-art',
  templateUrl: './album-art.component.html',
  styleUrls: ['./album-art.component.css']
})
export class AlbumArtComponent {

  @Output()
  imageClick: EventEmitter<any> = new EventEmitter();

  @Output()
  addClick: EventEmitter<any> = new EventEmitter();

  @Output()
  playClick: EventEmitter<any> = new EventEmitter();

  constructor() { }

}
