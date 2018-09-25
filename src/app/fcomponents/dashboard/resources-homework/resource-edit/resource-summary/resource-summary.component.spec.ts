import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceSummaryComponent } from './resource-summary.component';

describe('ResourceSummaryComponent', () => {
  let component: ResourceSummaryComponent;
  let fixture: ComponentFixture<ResourceSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
