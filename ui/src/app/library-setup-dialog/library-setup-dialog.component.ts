import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { LibraryService, PathValidatorService, ErrorService, LibrarySetupService } from '../services';
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
  isLoading: boolean;
  pathChangeSubscriptions: Subscription[] = [];

  constructor(private library: LibraryService, private dialog: MdDialogRef<LibrarySetupDialogComponent>, private pathValidator: PathValidatorService, private librarySetup: LibrarySetupService, private error: ErrorService) { }

  ngOnInit() {
    this.isLoading = true;
    this.librarySetup.getPaths().then((result) => {
      for (let path of result.paths) {
        this.addFolder(new LibrarySetupFolder(path));
      }
    }).catch().then(() => this.isLoading = false);
  }

  private addFolder(folder: LibrarySetupFolder) {
    this.pathChangeSubscriptions.push(folder.pathChange$.subscribe((value: string) => {
      folder.loading = true;
      this.pathValidator.isValid(value).then(result => {
        folder.valid = result;
        if (folder.valid) {
          folder.path = value;
        }
        folder.loading = false;
      }).catch(this.error.getGenericFailureFn('There was a problem checking folder validity.'));
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
