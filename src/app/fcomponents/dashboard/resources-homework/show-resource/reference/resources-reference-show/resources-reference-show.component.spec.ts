import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesReferenceShowComponent } from './resources-reference-show.component';

describe('ResourcesReferenceShowComponent', () => {
  let component: ResourcesReferenceShowComponent;
  let fixture: ComponentFixture<ResourcesReferenceShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcesReferenceShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesReferenceShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
