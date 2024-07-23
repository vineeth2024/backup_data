import { TestBed } from '@angular/core/testing';

import { TablexService } from './tablex.service';

describe('TablexService', () => {
  let service: TablexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
