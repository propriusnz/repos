import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesCollectionComponent } from './resources-collection.component';

describe('ResourcesCollectionComponent', () => {
  let component: ResourcesCollectionComponent;
  let fixture: ComponentFixture<ResourcesCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcesCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
