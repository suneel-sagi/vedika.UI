import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ownerServices } from '../OwnerModule/services/ownerServices';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.css']
})
export class ComingSoonComponent implements OnInit {

  myForm: FormGroup;
  ownerData: any;
  response: any;

  constructor(private router : Router,
    private service : ownerServices,
    private fb: FormBuilder, ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email : new FormControl(this.ownerData? this.ownerData.email: '', Validators.required),
      password : new FormControl(this.ownerData? this.ownerData.password: '', Validators.required)
    })
  }

  onSubmit(){
    this.ownerData = {
      email: this.myForm.get('email').value,
      password: this.myForm.get('password').value
    }
    this.service.postData(this.ownerData).subscribe( res => {
      console.log(res)
      // this.response = res;
      // if(this.response.data.msg == "success"){
       
      // }
    }); 
    this.router.navigateByUrl("/header")
  }
}
