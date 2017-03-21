import { Injectable } from '@angular/core';

@Injectable()
export class CapabilitiesService {

  constructor() { }
  
  isTouchDevice = function () {
    var el = document.createElement('div');
    el.setAttribute('ongesturestart', 'return;');
    return typeof el['ongesturestart'] === 'function';
  }

}
