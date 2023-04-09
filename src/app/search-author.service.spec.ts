import { TestBed } from '@angular/core/testing';

import { SearchAuthorService } from './search-author.service';

describe('SearchAuthorService', () => {
  let service: SearchAuthorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchAuthorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
