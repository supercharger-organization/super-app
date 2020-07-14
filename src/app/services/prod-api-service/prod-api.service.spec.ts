import { TestBed } from '@angular/core/testing';

import { ProdApiService } from './prod-api.service';

describe('ProdApiService', () => {
  let service: ProdApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
