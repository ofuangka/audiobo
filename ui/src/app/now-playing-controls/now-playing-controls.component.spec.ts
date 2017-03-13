import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NowPlayingControlsComponent } from './now-playing-controls.component';

describe('NowPlayingControlsComponent', () => {
  let component: NowPlayingControlsComponent;
  let fixture: ComponentFixture<NowPlayingControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NowPlayingControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NowPlayingControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
