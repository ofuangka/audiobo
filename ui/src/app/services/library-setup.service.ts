import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Folder } from '../domain';

@Injectable()
export class LibrarySetupService {

  constructor(private http: Http) { }

  getPaths(): Promise<any> {
    return this.http.get('/api/library-setup').toPromise().then((response) => response.json());
  }

  save(folders: Folder[]): Promise<any> {
    var postBody = {
      paths: []
    };
    for (let folder of folders) {
      postBody.paths.push(folder.path);
    }
    return this.http.post('/api/library-setup', JSON.stringify(postBody)).toPromise();
  }

}
