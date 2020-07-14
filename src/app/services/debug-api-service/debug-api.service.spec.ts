import { TestBed } from '@angular/core/testing';

import { DebugApiService } from './debug-api.service';

describe('DebugApiService', () => {
  let service: DebugApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebugApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
