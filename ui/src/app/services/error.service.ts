import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class ErrorService {

  private message = new Subject<any>();
  message$ = this.message.asObservable();

  constructor() { }

  getGenericFailureFn(message) {
    return (error) => {
      console.error(error);
      this.message.next(message || error.message);
    }
  }


}
