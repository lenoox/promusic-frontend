import { TestBed } from '@angular/core/testing';
import { HttpTokenInterceptor } from './http-token.interceptor';
import {RouterTestingModule} from "@angular/router/testing";
import {TokenService} from "../authentication/token.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('HttpTokenService', () => {
  let service: HttpTokenInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpTokenInterceptor,TokenService],
      imports: [ RouterTestingModule, HttpClientTestingModule]

    });
    service = TestBed.inject(HttpTokenInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
