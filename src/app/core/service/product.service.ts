import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Product } from '../../shared/model/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseurl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  CreateProduct(data): Observable<Product> {
    return this.http.post<Product>(this.baseurl + '/product/', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  GetProduct(id): Observable<Product> {
    return this.http.get<Product>(this.baseurl + '/product/' + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  GetProducts(slug): Observable<Product> {
    const params = new HttpParams().set('category', slug);
    return this.http.get<Product>(this.baseurl + '/product', {
      params
    })
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
  GetProductsByIds(ids): Observable<Product[]> {
    const params = new HttpParams().set('ids', ids);
    return this.http.get<Product>(this.baseurl + '/product/cart', {
      params
    })
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  UpdateProduct(id, data): Observable<Product> {
    return this.http.put<Product>(this.baseurl + '/product/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  DeleteProduct(id): Observable<any> {
    return this.http.delete<Product>(this.baseurl + '/product/' + id, this.httpOptions)
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
