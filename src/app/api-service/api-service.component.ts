import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, retryWhen, take, delay } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-api-service',
  templateUrl: './api-service.component.html',
  styleUrls: ['./api-service.component.css']
})
export class ApiServiceComponent {
  private url = "/api/url";
  private headerOptions = {};

  constructor(private http: HttpClient) {
    this.headerOptions = {
      'Content-Type': 'application/json',
      'X-API-KEY': 'cf3c5574-03e9-4423-82f9-bef49d91841a'
    };
  }

  httpGet(endpoint: string): Observable<any> {
    return this.http
      .get(this.url + endpoint, { headers: this.headerOptions })
      .pipe(
        map(this.handleSuccess),
        catchError(this.handleError)
      );
  }

  httpPost(endpoint: string, data: any): Observable<any> {
    return this.http
      .post<any>(this.url + endpoint, data, { headers: this.headerOptions })
      .pipe(
        map(this.handleSuccess),
        catchError(this.handleError)
      );
  }

  httpPut(endpoint: string, data: any): Observable<any> {
    return this.http
      .put<any>(this.url + endpoint, data, { headers: this.headerOptions })
      .pipe(
        map(this.handleSuccess),
        catchError(this.handleError)
      );
  }

  httpDelete(endpoint: string): Observable<any> {
    return this.http
      .delete<any>(this.url + endpoint, { headers: this.headerOptions })
      .pipe(
        map(this.handleSuccess),
        catchError(this.handleError)
      );
  }


  /* private methods */
  handleSuccess(response: any) {
    if (response.result && response.result.data) {
        return response.result.data;
    } else if (response.result && response.result.myZones) {
        return response.result;
    }

    return false;
  }

  handleError(error: any) {
    return throwError(error.msg || 'Unknown Server Error');
    // return function () {
    //   return { success: false, message: error };
    // };
  }
  
}
