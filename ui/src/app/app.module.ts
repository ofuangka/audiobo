import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import 'hammerjs';
import { NowPlayingControlsComponent } from './now-playing-controls/now-playing-controls.component';
import { DrawerComponent } from './drawer/drawer.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { SongListComponent } from './song-list/song-list.component';
import { CapabilitiesService, PlayerService, SecurityService, QueueService, LibraryService, RandomService, ComparatorService } from './services';
import { AboutDialogComponent } from './about-dialog/about-dialog.component';
import { LibrarySetupComponent } from './library-setup/library-setup.component';
import { SecondsPipe } from './pipes/seconds.pipe';
import { ZeroPadPipe } from './pipes/zero-pad.pipe';
import { SortArrowComponent } from './sort-arrow/sort-arrow.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NowPlayingControlsComponent,
    DrawerComponent,
    SidenavComponent,
    AlbumListComponent,
    SongListComponent,
    AboutDialogComponent,
    LibrarySetupComponent,
    SecondsPipe,
    SortArrowComponent,
    AlbumDetailsComponent,
    ZeroPadPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [CapabilitiesService, PlayerService, SecurityService, QueueService, LibraryService, RandomService, ComparatorService, Title],
  bootstrap: [AppComponent],
  entryComponents: [AboutDialogComponent, LibrarySetupComponent]
})
export class AppModule { }
