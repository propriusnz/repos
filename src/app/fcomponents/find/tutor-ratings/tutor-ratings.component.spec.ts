import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorRatingsComponent } from './tutor-ratings.component';

describe('TutorRatingsComponent', () => {
  let component: TutorRatingsComponent;
  let fixture: ComponentFixture<TutorRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
