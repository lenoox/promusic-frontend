import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Brand} from '../../shared/model/Brand';
@Injectable({
  providedIn: 'root'
})
export class BrandService {

  baseurl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  CreateBrand(data): Observable<Brand> {
    return this.http.post<Brand>(this.baseurl + '/brand/', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  GetBrand(id): Observable<Brand> {
    return this.http.get<Brand>(this.baseurl + '/brand/' + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  GetBrands(): Observable<Brand> {
    const object = {  };

    return this.http.get<Brand>(this.baseurl + '/brand', {
      params: object
    })
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  UpdateBrand(id, data): Observable<Brand> {
    return this.http.put<Brand>(this.baseurl + '/brand/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  DeleteBrand(id): Observable<any> {
    return this.http.delete<Brand>(this.baseurl + '/brand/' + id, this.httpOptions)
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
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
