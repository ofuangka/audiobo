import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarySetupDialogComponent } from './library-setup-dialog.component';

describe('LibrarySetupDialogComponent', () => {
  let component: LibrarySetupDialogComponent;
  let fixture: ComponentFixture<LibrarySetupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrarySetupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarySetupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
