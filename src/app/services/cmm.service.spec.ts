import { TestBed } from '@angular/core/testing';

import { CmmService } from './cmm.service';

describe('CmmService', () => {
  let service: CmmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
