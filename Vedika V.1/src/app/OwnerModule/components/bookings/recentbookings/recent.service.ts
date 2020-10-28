import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RecentService {

  constructor(private _http: HttpClient) { }
  getRecentbookings(): Observable<any> {
    return this._http.get("http://localhost:8057/api/recentlybooked?ownerId=kumar");
  }
}
