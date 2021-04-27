import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {TokenService} from './token.service';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from '../../shared/model/user';
import {Router} from '@angular/router';

const OAUTH_CLIENT = 'devglan-client';
const OAUTH_SECRET = 'devglan-secret';
const API_URL = 'http://localhost:8080/';
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + btoa(OAUTH_CLIENT + ':' + OAUTH_SECRET)
  })
};
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  role = null;
  authorized = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) {}
  private static handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
  login(loginData: any): Observable<any> {
    this.logout();
    const body = new HttpParams()
      .set('username', loginData.username)
      .set('password', loginData.password)
      .set('grant_type', 'password');

    return this.http.post<any>(API_URL + 'oauth/token', body, HTTP_OPTIONS)
      .pipe(
        tap(res => {
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveRefreshToken(res.refresh_token);
          this.getUserInfo();
        }),
        catchError(AuthenticationService.handleError)
      );
  }
  getUserInfo(): Promise<User> {
    return this.http.get<any>(API_URL + 'users/me').pipe(tap(user => {
      this.role = user.role.name;
      this.authorized = true;
    })).toPromise();
  }
  refreshToken(refreshData: any): Observable<any> {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    const body = new HttpParams()
      .set('refresh_token', refreshData.refresh_token)
      .set('grant_type', 'refresh_token');
    return this.http.post<any>(API_URL + 'oauth/token', body, HTTP_OPTIONS)
      .pipe(
        tap(res => {
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }),
        catchError(AuthenticationService.handleError)
      );
  }
  logout(): void {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    this.role = null;
    this.authorized = false;
    this.router.navigate(['/login']).then(_ => false);
  }
  isEmployee(): boolean {
    if (this.role === 'EMPLOYEE') {
      return true;
    }
    return false;
  }
  isClient(): boolean {
    if (this.role === 'USER') {
      return true;
    }
    return false;
  }
  isAuthorized(): boolean {
    return this.authorized;
  }
}
