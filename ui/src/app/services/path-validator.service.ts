import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PathValidatorService {

  constructor(private http: Http) { }

  isValid(path: string) {
    return this.http.get('/api/folder-validity?path=' + encodeURIComponent(path)).toPromise().then(response => response.json());
  }

}
