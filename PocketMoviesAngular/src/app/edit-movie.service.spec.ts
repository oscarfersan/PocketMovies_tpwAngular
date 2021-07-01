import { TestBed } from '@angular/core/testing';

import { EditMovieService } from './edit-movie.service';

describe('EditMovieService', () => {
  let service: EditMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
