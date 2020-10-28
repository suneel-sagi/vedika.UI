import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable } from 'rxjs';
import{ environment} from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SearchbarService {

  constructor(private http: HttpClient) { }
  getAllFunctionHalls():Observable<any>
  {
    return this.http.get(environment.api_url+'/api/functionhalls');
  }
  
  findFunctionhallByNameAndCity(city):Observable<any>
  {
    return this.http.get(environment.api_url+'/api/functionhalls/?city='+city);
  }
 
}

