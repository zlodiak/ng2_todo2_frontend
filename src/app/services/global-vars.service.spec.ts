import { TestBed, inject } from '@angular/core/testing';

import { GlobalVarsService } from './global-vars.service';

describe('GlobalVarsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalVarsService]
    });
  });

  it('should be created', inject([GlobalVarsService], (service: GlobalVarsService) => {
    expect(service).toBeTruthy();
  }));
});
