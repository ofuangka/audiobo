import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import 'hammerjs';
import { NowPlayingControlsComponent } from './now-playing-controls/now-playing-controls.component';
import { QueueDrawerComponent } from './queue-drawer/queue-drawer.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { SongListComponent } from './song-list/song-list.component';
import { CapabilitiesService, PlayerService, SecurityService, QueueService, LibraryService } from './services';
import { AboutDialogComponent } from './about-dialog/about-dialog.component';
import { LibrarySetupComponent } from './library-setup/library-setup.component';
import { SecondsPipe } from './pipes/seconds.pipe';
import { HyphenZeroesPipe } from './pipes/hyphen-zeroes.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NowPlayingControlsComponent,
    QueueDrawerComponent,
    SidenavComponent,
    AlbumListComponent,
    SongListComponent,
    AboutDialogComponent,
    LibrarySetupComponent,
    SecondsPipe,
    HyphenZeroesPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [CapabilitiesService, PlayerService, SecurityService, QueueService, LibraryService],
  bootstrap: [AppComponent],
  entryComponents: [AboutDialogComponent, LibrarySetupComponent]
})
export class AppModule { }
