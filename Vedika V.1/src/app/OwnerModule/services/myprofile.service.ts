import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { profilemodel } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class MyprofileService {

  constructor(private _http: HttpClient) { }
  
    getprofile(): Observable<any>{
      return this._http.get("http://localhost:8057/api/Allowners?user_Id=yaswanth3b3");
    }
    
    updateprofile(input): Observable<any>
    {
      return this._http.put<profilemodel> ("http://localhost:8057/api/updateOwner?id=" + input.user_Id,input);
    }
  
}