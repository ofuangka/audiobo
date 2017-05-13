import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LibrarySetupService {

  constructor(private http: Http) { }

  getPaths(): Promise<any> {
    return this.http.get('/api/library-setup').toPromise().then((response) => response.json());
  }

}
