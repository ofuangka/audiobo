import { AfterViewInit } from '@angular/core';

const VIEW_TIMEOUT = 30000;

export class NotifyingView implements AfterViewInit {

  viewInitializedResolve;

  viewInitialized = new Promise((resolve, reject) => {
    this.viewInitializedResolve = resolve;
    setTimeout(() => reject(new Error('View failed to initialize before timeout')), VIEW_TIMEOUT);
  });

  ngAfterViewInit() {
    this.viewInitializedResolve();
  }
}