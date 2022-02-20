import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Status} from '../../shared/model/status';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StatusService {

  baseurl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  CreateStatus(data): Observable<Status> {
    return this.http.post<Status>(this.baseurl + '/status/', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  GetStatus(id): Observable<Status> {
    return this.http.get<Status>(this.baseurl + '/status/' + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  GetAllStatus(): Observable<Status[]> {
    const object = {  };

    return this.http.get<Status>(this.baseurl + '/status', {
      params: object
    })
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  UpdateStatus(id, data): Observable<Status> {
    return this.http.put<Status>(this.baseurl + '/status/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  DeleteStatus(id): Observable<any> {
    return this.http.delete<Status>(this.baseurl + '/status/' + id, this.httpOptions)
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
