import { TestBed } from '@angular/core/testing';

import { CallApi } from './api.service';

describe('ApiService', () => {
  let service: CallApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
