import {fakeAsync, TestBed} from '@angular/core/testing';
import { EmployeeGuard } from './employee.guard';
import {RouterTestingModule} from "@angular/router/testing";
import {TokenService} from "../authentication/token.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {EMPLOYEE_INFO, USER_INFO} from "../../db-data/db-data";
import {AuthenticationService} from "../authentication/authentication.service";
import {LoginComponent} from "../../modules/auth/login/login.component";
import {OrderListComponent} from "../../modules/employee/order/order-list/order-list.component";
import {Router} from "@angular/router";

describe('EmployeeGuard', () => {
  const authenticationSpy = jasmine.createSpyObj('AuthenticationService', ['getUserInfo']);
  const tokenServiceSpy= jasmine.createSpyObj('TokenService', ['getRefreshToken']);
  let guard: EmployeeGuard;
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
          { path: 'employee/order', component: OrderListComponent, canActivate: [ EmployeeGuard ]}
        ]),
        HttpClientTestingModule
      ]
    });
    guard = TestBed.inject(EmployeeGuard);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthenticationService);
    tokenService = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should disallow access for the client to the order panel of a store while logged in', fakeAsync(async() => {
    router.navigateByUrl('employee/order');
    tokenService.getRefreshToken.and.returnValue('tokenexample');
    authService.getUserInfo.and.returnValue(Promise.resolve(USER_INFO));
    await guard.canActivate(<any>{}, <any>{}).then((result) => {
      expect(result).toBe(false);
    });
  }));

  it('should disallow access for the employee to the order panel of the store without logging in',  fakeAsync(async() => {
    router.navigateByUrl('employee/order');
    tokenService.getRefreshToken.and.returnValue(null);
    await guard.canActivate(<any>{}, <any>{}).then((result) => {
      expect(result).toBe(false);
    });
  }));

  it('should allow access for the employee to the order panel of a store while logged in', fakeAsync(async() => {
    router.navigateByUrl('employee/order');
    tokenService.getRefreshToken.and.returnValue('tokenexample');
    authService.getUserInfo.and.returnValue(Promise.resolve(EMPLOYEE_INFO));
    await guard.canActivate(<any>{}, <any>{}).then((result) => {
      expect(result).toBe(true);
    });
  }));
});
