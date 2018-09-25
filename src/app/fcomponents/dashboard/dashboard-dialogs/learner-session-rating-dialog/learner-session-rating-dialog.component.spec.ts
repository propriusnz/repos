import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerSessionRatingDialogComponent } from './learner-session-rating-dialog.component';

describe('LearnerSessionRatingDialogComponent', () => {
  let component: LearnerSessionRatingDialogComponent;
  let fixture: ComponentFixture<LearnerSessionRatingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerSessionRatingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerSessionRatingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
