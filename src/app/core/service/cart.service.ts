import { Injectable } from '@angular/core';
import {Observable,  throwError} from 'rxjs';
import {Product} from '../../shared/model/product';
import {catchError, retry} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Cart} from '../../shared/model/cart';
import {environment} from '../../../environments/environment';

const CART = 'cart_token';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseurl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  GetProductsByCart(data): Observable<Cart> {
    return this.http.post<Product>(this.baseurl + '/cart', JSON.stringify(data), this.httpOptions)
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
