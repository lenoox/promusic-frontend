import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Order } from '../../shared/model/order';
import {Page} from '../../shared/model/page';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseurl = 'http://localhost:8080';

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

  CreateOrder(data): Observable<HttpResponse<Order>> {
    return this.http.post(this.baseurl + '/order/', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  GetOrder(id): Observable<Order> {
    return this.http.get<Order>(this.baseurl + '/order/' + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  GetOrders(page, size): Observable<Page<Order[]>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<Order>(this.baseurl + '/order', {
      params
    })
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  UpdateOrder(id, data): Observable<Order> {
    return this.http.put<Order>(this.baseurl + '/order/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  DeleteOrder(id): Observable<any> {
    return this.http.delete<Order>(this.baseurl + '/order/' + id, this.httpOptions)
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
