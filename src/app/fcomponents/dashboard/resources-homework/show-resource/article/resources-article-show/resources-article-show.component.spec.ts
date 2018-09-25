import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesArticleShowComponent } from './resources-article-show.component';

describe('ResourcesArticleShowComponent', () => {
  let component: ResourcesArticleShowComponent;
  let fixture: ComponentFixture<ResourcesArticleShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcesArticleShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesArticleShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
