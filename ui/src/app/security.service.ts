import { Injectable } from '@angular/core';

@Injectable()
export class SecurityService {

  constructor() { }

  isLoggedIn() {
    return Promise.resolve('ofuangka');
  }

}
