import { TestBed, inject } from '@angular/core/testing';

import { SwaggerConvertService } from './swagger-convert.service';

describe('SwaggerConvertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwaggerConvertService]
    });
  });

  it('should be created', inject([SwaggerConvertService], (service: SwaggerConvertService) => {
    expect(service).toBeTruthy();
  }));
});
