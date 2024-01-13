import { TestBed } from '@angular/core/testing';

import { SendFormService } from './send-form.service';

describe('SendFormService', () => {
  let service: SendFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
