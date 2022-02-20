import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {catchError, finalize, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.service';
import {TokenService} from '../authentication/token.service';
import {LoadingService} from "../service/loading.service";

@Injectable({
  providedIn: 'root'
})
export class HttpTokenInterceptor {
  private totalRequests = 0;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private tokenService: TokenService,
    private loadingService: LoadingService
  ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): any {

    const token = this.tokenService.getToken();
    const refreshToken = this.tokenService.getRefreshToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'content-type': 'application/json'
        }
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });
    this.totalRequests++;
    this.loadingService.setLoading(true);
    this.loadingService.setIsErrorMsg(false);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.error.error);
        this.loadingService.setIsErrorMsg(true);
        if (error.status === 401) {
          if (error.error.error === 'invalid_token') {
            this.authenticationService.refreshToken({refresh_token: refreshToken})
              .subscribe(() => {
                location.reload();
              });
          } else {
            this.router.navigate(['login']).then(_ => console.log('redirect to login'));
          }
        }
        return throwError(error);
      }),
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.loadingService.setLoading(false);
        }
      })
    );
  }
}
