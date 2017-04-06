import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { LibraryService, PathValidatorService } from '../services';
import { Folder } from '../domain/folder';

class LibrarySetupFolder extends Folder {
  private pathChange = new Subject();

  folder: Folder;
  loading = false;
  pathChange$ = this.pathChange.asObservable().debounceTime(400).distinctUntilChanged();
  valid = true;

  triggerPathChange(newValue: string) {
    this.pathChange.next(newValue);
  }
}

@Component({
  selector: 'library-setup-dialog',
  templateUrl: './library-setup-dialog.component.html',
  styleUrls: ['./library-setup-dialog.component.css']
})
export class LibrarySetupDialogComponent implements OnInit {

  folders: LibrarySetupFolder[] = [];
  persistedFolders: Folder[] = [];
  pathChangeSubscriptions: Subscription[] = [];

  constructor(private library: LibraryService, private dialog: MdDialogRef<LibrarySetupDialogComponent>, private pathValidator: PathValidatorService) { }

  ngOnInit() {
    for (let folder of this.persistedFolders) {
      this.addFolder(new LibrarySetupFolder(folder.path));
    }
    this.addFolder(new LibrarySetupFolder(''));
  }

  private addFolder(folder: LibrarySetupFolder) {
    this.pathChangeSubscriptions.push(folder.pathChange$.subscribe((value: string) => {
      folder.loading = true;
      this.pathValidator.isValid(value).subscribe((result) => {
        folder.valid = Math.random() > 0.5;
        if (folder.valid) {
          folder.path = value;
        }
        folder.loading = false;
      });
    }));
    this.folders.push(folder);

  }

  removeFolder(folder: LibrarySetupFolder) {
    let folderIndex = this.folders.indexOf(folder);
    this.pathChangeSubscriptions[folderIndex].unsubscribe();
    this.folders.splice(folderIndex, 1);
  }

  generateNewFolder() {
    this.addFolder(new LibrarySetupFolder(''));
  }

  allFoldersValid(): boolean {
    for (let folder of this.folders) {
      if (!folder.valid || folder.loading) {
        return false;
      }
    }
    return true;
  }

  getFolderStatusIcon(folder: LibrarySetupFolder) {
    if (folder.loading) {
      return 'sync';
    } else if (folder.valid) {
      return 'check';
    }
    return 'warning';
  }

  isFolderBlank(folder: LibrarySetupFolder) {
    return folder.path.trim() === '';
  }

  refreshAndClose() {
    this.library.refreshing = true;
    this.dialog.close(true);
  }

}
