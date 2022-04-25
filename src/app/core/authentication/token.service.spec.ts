import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenService],
      imports: [ RouterTestingModule,HttpClientTestingModule ]
    });
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
