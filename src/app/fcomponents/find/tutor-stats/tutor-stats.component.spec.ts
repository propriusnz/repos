import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorStatsComponent } from './tutor-stats.component';

describe('TutorStatsComponent', () => {
  let component: TutorStatsComponent;
  let fixture: ComponentFixture<TutorStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
