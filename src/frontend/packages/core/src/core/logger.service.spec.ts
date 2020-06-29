import { inject, TestBed } from '@angular/core/testing';
import { createBasicStoreModule } from '@stratosui/store/testing';

import { CoreTestingModule } from '../../test-framework/core-test.modules';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoggerService
      ],
      imports: [
        CoreTestingModule,
        createBasicStoreModule(),
      ]
    });
  });

  it('should be created', inject([LoggerService], (service: LoggerService) => {
    expect(service).toBeTruthy();
  }));
});
