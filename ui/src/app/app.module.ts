import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import 'hammerjs';
import { NowPlayingControlsComponent } from './now-playing-controls/now-playing-controls.component';
import { TrackQueueComponent } from './track-queue/track-queue.component';
import { RootNavComponent } from './root-nav/root-nav.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { SongListComponent } from './song-list/song-list.component';
import { CapabilitiesService } from './capabilities.service';
import { PlayerService } from './player.service';
import { SecurityService } from './security.service';

@NgModule({
  declarations: [
    AppComponent,
    NowPlayingControlsComponent,
    TrackQueueComponent,
    RootNavComponent,
    AlbumListComponent,
    SongListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [CapabilitiesService, PlayerService, SecurityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
