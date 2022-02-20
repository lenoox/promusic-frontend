import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from '../../shared/model/user';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseurl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  httpOptions: {
    headers?: HttpHeaders;
    observe: 'response';
    params?: HttpParams;
  } = {
    headers:  new HttpHeaders().append(
      'Content-Type', 'application/json',
    ),
    observe: 'response'
  };

  CreateUser(data): Observable<HttpResponse<User>> {
    return this.http.post(this.baseurl + '/users/', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  GetUser(id): Observable<User> {
    return this.http.get<User>(this.baseurl + '/users/' + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  GetUsers(slug): Observable<User> {
    const params = new HttpParams().set('category', slug);
    return this.http.get<User>(this.baseurl + '/user', {
      params
    })
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  UpdateUser(data): Observable<HttpResponse<User>>  {
    return this.http.put<User>(this.baseurl + '/users/me', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
  UpdateUserPassword(data): Observable<HttpResponse<User>>  {
    return this.http.put<User>(this.baseurl + '/users/me/password', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  DeleteUser(id): Observable<any> {
    return this.http.delete<User>(this.baseurl + '/users/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error): Observable<any> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
