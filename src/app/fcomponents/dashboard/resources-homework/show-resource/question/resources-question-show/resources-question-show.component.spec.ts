import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesQuestionShowComponent } from './resources-question-show.component';

describe('ResourcesQuestionShowComponent', () => {
  let component: ResourcesQuestionShowComponent;
  let fixture: ComponentFixture<ResourcesQuestionShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcesQuestionShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesQuestionShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
