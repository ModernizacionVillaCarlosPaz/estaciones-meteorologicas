import { TestBed } from '@angular/core/testing';

import { Cmm1Service } from './cmm1.service';

describe('Cmm1Service', () => {
  let service: Cmm1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cmm1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
