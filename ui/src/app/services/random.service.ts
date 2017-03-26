import { Injectable } from '@angular/core';

@Injectable()
export class RandomService {

  constructor() { }

  next(max: number) {
    return Math.round(Math.random() * max);
  }

}
