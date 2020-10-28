import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'src/app/OwnerModule/services/localstorage.service';
import { ownerServices } from '../../services/ownerServices';


@Component({
  selector: 'app-owner-login',
  templateUrl: './owner-login.component.html',
  styleUrls: ['./owner-login.component.css']
})
export class OwnerLoginComponent implements OnInit {
  msg1: string;
  loadedPosts = [];
  response;
  LoginForm: FormGroup;
  LoginDetails: any;
  mobileNumber: string;
  otp: string;
  message: string;
  token = [];
  msg:string;
  logindata: any;



  constructor(private router: Router,
    private http: HttpClient,
    private LoginSer: ownerServices,

    private _fb: FormBuilder,
    private localstorageservice: LocalStorageService,
  ) { }



  ngOnInit(): void {
    this.LoginForm = this._fb.group({
      mobileNumber: new FormControl(this.mobileNumber ? this.LoginDetails.mobileNumber : '', Validators.required),
      otp: new FormControl(this.otp ? this.LoginDetails.otp : '', Validators.required),
    })
  }

  login(putData: { mobileNumber: string; otp: string }) {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append("content-type", "application/json")
    console.log(putData)
    return this.http.put(
      'http://localhost:8057/api/login/verification', putData,
    )
    // .subscribe((res:any) => {

    //   this.message = res.message,

    //   console.log(res)
    // }
      .subscribe(res => {

        console.log(res)
        // this.token.push(res);
        // console.log(this.token)
        // this.router.navigate(['/owner-dashboard', this.token[0]])
        this.response = res;
        console.log(this.response.data.msg);
        if(this.response.data.msg == "sucess"){
          console.log(this.response)
         
          this.router.navigate(['/owner-dashboard', this.response.data])
        }
        else if(this.response.data.msg == "Failure"){
        //  console.log("please enter valid OTP");
         this.msg1 = "please enter valid OTP"
        }


      });
  }
  sendotp(postData: { mobileNumber: string; }) {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append("content-type", "application/json")
    console.log(postData)
    return this.http.post(
      'http://localhost:8057/api/login/verification?mobileNumber=' + postData.mobileNumber, postData,
    )
      .subscribe((res:any) => {

this.msg=res.msg,
        console.log(res)
      });
  }
}

