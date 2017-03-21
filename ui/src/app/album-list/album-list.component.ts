import { Component, OnInit } from '@angular/core';

import { CapabilitiesService } from '../services';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {

  albums = [
    { id: '0', title: 'Tommy', artist: 'The Who', year: '1971' },
    { id: '1', title: 'Enter the Gungeon', artist: 'Doseone', year: '2016' },
    { id: '2', title: 'FTL', artist: 'Ben Prunty', year: '2012' },
    { id: '3', title: 'Shovel Knight The Definitive Soundtrack', artist: 'Jake Kaufman', year: '2014' },
    { id: '4', title: 'Tommy', artist: 'The Who', year: '1971' },
    { id: '5', title: 'Enter the Gungeon', artist: 'Doseone', year: '2016' },
    { id: '6', title: 'FTL', artist: 'Ben Prunty', year: '2012' },
    { id: '7', title: 'Shovel Knight The Definitive Soundtrack', artist: 'Jake Kaufman', year: '2014' },

  ];
  filteredAlbums = this.albums;

  constructor(private capabilities: CapabilitiesService) { }

  ngOnInit() {
  }

  isTouchDevice() {
    return this.capabilities.isTouchDevice();
  }

  addAlbumToQueue(album) {

  }

  playAlbum(album) {
    
  }

}
