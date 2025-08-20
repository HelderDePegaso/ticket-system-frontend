import { TestBed } from '@angular/core/testing';

import { SuperAngularLibService } from './super-angular-lib.service';

describe('SuperAngularLibService', () => {
  let service: SuperAngularLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperAngularLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
