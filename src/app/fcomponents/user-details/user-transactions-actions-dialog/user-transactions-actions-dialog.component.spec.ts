import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTransactionsActionsDialogComponent } from './user-transactions-actions-dialog.component';

describe('UserTransactionsActionsDialogComponent', () => {
  let component: UserTransactionsActionsDialogComponent;
  let fixture: ComponentFixture<UserTransactionsActionsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTransactionsActionsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTransactionsActionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
