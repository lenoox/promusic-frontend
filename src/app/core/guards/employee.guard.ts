import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.service';
import {TokenService} from '../authentication/token.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private tokenService: TokenService,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): | Promise<boolean | UrlTree> {
    return new Promise((resolve) => {
      if (this.tokenService.getRefreshToken() === null) {
        console.log('token is empty');
        this.router.navigate(['/login']).then(_ => false);
        resolve(false);
      } else {
        this.authenticationService.getUserInfo().then(user => {
          if (user.role.name === 'EMPLOYEE') {
            console.log('Authorized');
            resolve(true);
          } else {
            console.log('NOT Authorized');
            this.router.navigate(['/login']).then(_ => false);
            resolve(false);
          }
        });
      }
    });
  }
}
