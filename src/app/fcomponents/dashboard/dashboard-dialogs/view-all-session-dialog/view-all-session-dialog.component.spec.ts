import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllSessionDialogComponent } from './view-all-session-dialog.component';

describe('ViewAllSessionDialogComponent', () => {
  let component: ViewAllSessionDialogComponent;
  let fixture: ComponentFixture<ViewAllSessionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllSessionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllSessionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
