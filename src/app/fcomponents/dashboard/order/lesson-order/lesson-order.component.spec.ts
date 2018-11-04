import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonOrderComponent } from './lesson-order.component';

describe('LessonOrderComponent', () => {
  let component: LessonOrderComponent;
  let fixture: ComponentFixture<LessonOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
