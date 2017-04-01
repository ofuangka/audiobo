import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class PathValidatorService {

  constructor(private http: Http) { }

  isValid(path: string) {
    return this.http.get('/');
  }

}
