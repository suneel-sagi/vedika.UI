import { Observable, ObservableInput, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private _http: HttpClient) { }

  getBooking(): Observable<any> {
    return this._http.get("http://localhost:8057/api/recentlybooked?ownerId=kumar");

  }

}