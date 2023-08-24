import { TestBed } from '@angular/core/testing';

import { Cmm2Service } from './cmm2.service';

describe('Cmm2Service', () => {
  let service: Cmm2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cmm2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
