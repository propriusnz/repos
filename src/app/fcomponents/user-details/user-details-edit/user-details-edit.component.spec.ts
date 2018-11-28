/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserDetailsEditComponent } from './user-details-edit.component';

describe('UserDetailsEditComponent', () => {
  let component: UserDetailsEditComponent;
  let fixture: ComponentFixture<UserDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
