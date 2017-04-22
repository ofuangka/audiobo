import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { CapabilitiesService, PlayerService, SecurityService, QueueService, LibraryService, RandomService, ComparatorService, HashCodeService, BackgroundColorService, PathValidatorService, ErrorService } from './services';
import { AboutDialogComponent } from './about-dialog/about-dialog.component';
import { LibrarySetupDialogComponent } from './library-setup-dialog/library-setup-dialog.component';
import { DurationPipe, ZeroPadPipe } from './pipes';
import { SortArrowComponent } from './sort-arrow/sort-arrow.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { ErrorMessageDialogComponent } from './error-message-dialog/error-message-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NowPlayingControlsComponent,
    DrawerComponent,
    SidenavComponent,
    AlbumListComponent,
    SongListComponent,
    AboutDialogComponent,
    LibrarySetupDialogComponent,
    DurationPipe,
    SortArrowComponent,
    AlbumDetailsComponent,
    ZeroPadPipe,
    ErrorMessageDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [CapabilitiesService, PlayerService, SecurityService, QueueService, LibraryService, RandomService, ComparatorService, Title, HashCodeService, BackgroundColorService, PathValidatorService, ErrorService],
  bootstrap: [AppComponent],
  entryComponents: [AboutDialogComponent, LibrarySetupDialogComponent, ErrorMessageDialogComponent]
})
export class AppModule { }
