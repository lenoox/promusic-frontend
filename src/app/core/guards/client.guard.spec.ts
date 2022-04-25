import {fakeAsync, flush, TestBed, waitForAsync} from '@angular/core/testing';
import { ClientGuard } from './client.guard';
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication/authentication.service";
import {TokenService} from "../authentication/token.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {USER_INFO} from "../../db-data/db-data";
import {LoginComponent} from "../../modules/auth/login/login.component";
import {CartComponent} from "../../modules/client/cart/cart.component";

describe('ClientGuard', () => {
  const tokenServiceSpy= jasmine.createSpyObj('TokenService', ['getRefreshToken']);
  const authenticationSpy = jasmine.createSpyObj('AuthenticationService', ['getUserInfo']);
  let guard: ClientGuard;
  let authService;
  let tokenService;
  let router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: TokenService, useValue: tokenServiceSpy},
        {provide: AuthenticationService, useValue: authenticationSpy},
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent },
          { path: 'cart', component: CartComponent, canActivate: [ ClientGuard ] },
        ]),
        HttpClientTestingModule
      ]
    });
    guard = TestBed.inject(ClientGuard);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthenticationService);
    tokenService = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should disallow access for the client to the cart subpage of a store without logging in',  fakeAsync(async() => {
    router.navigateByUrl('cart');
    tokenService.getRefreshToken.and.returnValue(null);
    await guard.canActivate(<any>{}, <any>{}).then((result) => {
      expect(result).toBe(false);
    });
  }));
  it('should allow access for the client to the cart subpage of a store while logged in', fakeAsync(async() => {
    router.navigateByUrl('cart');
    tokenService.getRefreshToken.and.returnValue('tokenexample');
    authService.getUserInfo.and.returnValue(Promise.resolve(USER_INFO));
    await guard.canActivate(<any>{}, <any>{}).then((result) => {
      expect(result).toBe(true);
    });
  }));
});
