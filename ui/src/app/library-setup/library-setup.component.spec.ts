import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarySetupComponent } from './library-setup.component';

describe('LibrarySetupComponent', () => {
  let component: LibrarySetupComponent;
  let fixture: ComponentFixture<LibrarySetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrarySetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarySetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
