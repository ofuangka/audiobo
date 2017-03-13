import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlbumListComponent } from './album-list/album-list.component';
import { SongListComponent } from './song-list/song-list.component';

const appRoutes: Routes = [
  { path: 'library/albums', component: AlbumListComponent },
  { path: 'library/songs', component: SongListComponent },
  { path: '', redirectTo: '/library/albums', pathMatch: 'full' },
  { path: '**', redirectTo: '/library/albums' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }