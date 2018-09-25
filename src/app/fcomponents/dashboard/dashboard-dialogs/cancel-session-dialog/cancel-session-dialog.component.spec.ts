import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelSessionDialogComponent } from './cancel-session-dialog.component';

describe('CancelSessionDialogComponent', () => {
  let component: CancelSessionDialogComponent;
  let fixture: ComponentFixture<CancelSessionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelSessionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelSessionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
