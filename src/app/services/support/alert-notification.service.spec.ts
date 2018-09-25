import { TestBed, inject } from '@angular/core/testing';

import { AlertNotificationService } from './alert-notification.service';

describe('AlertNotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertNotificationService]
    });
  });

  it('should be created', inject([AlertNotificationService], (service: AlertNotificationService) => {
    expect(service).toBeTruthy();
  }));
});
