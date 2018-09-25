import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionParentComponent } from './question-parent.component';

describe('QuestionParentComponent', () => {
  let component: QuestionParentComponent;
  let fixture: ComponentFixture<QuestionParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
