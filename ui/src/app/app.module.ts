import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import 'hammerjs';
import { NowPlayingControlsComponent } from './now-playing-controls/now-playing-controls.component';
import { QueueComponent } from './queue/queue.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { SongListComponent } from './song-list/song-list.component';
import { CapabilitiesService } from './capabilities.service';
import { PlayerService } from './player.service';
import { SecurityService } from './security.service';
import { AboutDialogComponent } from './about-dialog/about-dialog.component';
import { LibrarySetupComponent } from './library-setup/library-setup.component';

@NgModule({
  declarations: [
    AppComponent,
    NowPlayingControlsComponent,
    QueueComponent,
    SidenavComponent,
    AlbumListComponent,
    SongListComponent,
    AboutDialogComponent,
    LibrarySetupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [CapabilitiesService, PlayerService, SecurityService],
  bootstrap: [AppComponent],
  entryComponents: [AboutDialogComponent, LibrarySetupComponent]
})
export class AppModule { }
