import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from "@angular/common/http";
import { PublishListingModel } from '../models/publishlisting.model';
import { OwnerLogin } from '../models/owner-login';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ownerServices {

  constructor(private _http: HttpClient) { }



  //   Owner Login Service
  sendotp(Ownerlogin: OwnerLogin): Observable<any> {
    console.log(Ownerlogin);
    return this._http.put(environment.api_url + '/api/login/verification', Ownerlogin);
  }

  //   Owner Register User
  registerUser(user): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application/json')
    return this._http.post<any>(environment.api_url + '/api/ownerregistration', user, { headers: httpHeaders })
  }



  // Location Services   

  getCountry(country): Observable<any> {
    return this._http.get(environment.api_url + "/api/state/details?country=" + country);
  }
  getStates(country): Observable<any> {
    return this._http.get(environment.api_url + "/api/state/details?country=" + country);
  }
  getCity(city): Observable<any> {
    return this._http.get(environment.api_url + "/api/city/details?state=" + city);

  }



  //   Acccount Details Services
  getBanks(): Observable<any> {
    return this._http.get(environment.api_url + "/api/banks");
  }
  getBranches(bank): Observable<any> {
    return this._http.get(environment.api_url + "/api/branches?bank=" + bank);

  }
  getBranchIfsc(bankname, branch): Observable<any> {
    const opts = { params: new HttpParams({ fromString: "bankname=" + bankname + "&" + "branch=" + branch }) };
    return this._http.get(environment.api_url + "/api/bankdetails/", opts);

  }

  //   photos service

  public postFile(file): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'multipart/form-data');
    return this._http.post<any>(environment.api_url + '/api/image/', file, { headers: httpHeaders });
  }


  // security service
  public addmobileNumber(mobilenumber, req: any): Observable<any> {
    return this._http.post<any>(environment.api_url + '/api/user/verification?mobileNumber=' + mobilenumber, req);
  }



  //   publish listing service

  baseUrl = environment.api_url + '/api/publishListing';

  pubList(PublishDetails: PublishListingModel): Observable<PublishListingModel> {
    var data = { PublishDetails: PublishDetails };

    console.log(data);
    return this._http.post<PublishListingModel>(this.baseUrl, PublishDetails, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  postData(comingSoon:any):Observable<any>{
    return this._http.post(environment.api_url +'/api/homepage', comingSoon)
  }






}

