import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import {RouterTestingModule} from "@angular/router/testing";
import {TokenService} from "./token.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";


describe('AuthenticationService', () => {
  let service: AuthenticationService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService,TokenService],
      imports: [ HttpClientTestingModule,RouterTestingModule ]
    });
  });
  beforeEach(() => {
      service = TestBed.inject(AuthenticationService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
