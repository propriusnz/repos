import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleParentComponent } from './article-parent.component';

describe('ArticleParentComponent', () => {
  let component: ArticleParentComponent;
  let fixture: ComponentFixture<ArticleParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
