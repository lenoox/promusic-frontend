import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Category} from '../../shared/model/category';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseurl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  CreateCategory(data): Observable<Category> {
    return this.http.post<Category>(this.baseurl + '/category/', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  GetCategory(id): Observable<Category> {
    return this.http.get<Category>(this.baseurl + '/category/' + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  GetCategorys(): Observable<Category> {
    const object = {  };

    return this.http.get<Category>(this.baseurl + '/category', {
      params: object
    })
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  UpdateCategory(id, data): Observable<Category> {
    return this.http.put<Category>(this.baseurl + '/category/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  DeleteCategory(id): Observable<any> {
    return this.http.delete<Category>(this.baseurl + '/category/' + id, this.httpOptions)
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
