import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryStatusComponent } from './library-status.component';

describe('LibraryStatusComponent', () => {
  let component: LibraryStatusComponent;
  let fixture: ComponentFixture<LibraryStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
