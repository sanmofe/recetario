// HU: REC-4 y REC-6
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RestauranteService } from './restaurante.service';

describe('Service: Restaurante', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestauranteService]
    });
  });

  it('should ...', inject([RestauranteService], (service: RestauranteService) => {
    expect(service).toBeTruthy();
  }));
});
