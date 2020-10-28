import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addservice',
  templateUrl: './addservice.component.html',
  styleUrls: ['./addservice.component.css']
})
export class AddserviceComponent implements OnInit {
  PhotographyDetails: any;
  PhotographyForm: FormGroup;
  FoodCateringDetails: any;
  FoodCateringForm: FormGroup;
  

  constructor(
    private _fb: FormBuilder,
    )
     { }

  ngOnInit(): void {
    this.PhotographyDetails = JSON.parse(window.localStorage.getItem('PhotographyDetails'));
    this.PhotographyForm = this._fb.group({  
      studioName: new FormControl(this.PhotographyDetails ? this.PhotographyDetails.studioName : '', Validators.required),
      typeofPhotography: new FormControl(this.PhotographyDetails ? this.PhotographyDetails.typeofPhotography : '', Validators.required),
      others: new FormControl(this.PhotographyDetails ? this.PhotographyDetails.others : '', Validators.required),
      vendorname: new FormControl(this.PhotographyDetails ? this.PhotographyDetails.others : '', Validators.required),
      mobileNumber: new FormControl(this.PhotographyDetails ? this.PhotographyDetails.mobileNumber : '', [Validators.minLength(10),Validators.required,Validators.pattern("^((\\+91-?))+[0-9]{10}$")]),
      email: new FormControl(this.PhotographyDetails ? this.PhotographyDetails.email : '', Validators.required),
      address: new FormControl(this.PhotographyDetails ? this.PhotographyDetails.address : '', Validators.required),
      state: new FormControl(this.PhotographyDetails ? this.PhotographyDetails.state : '', Validators.required),
      city: new FormControl(this.PhotographyDetails ? this.PhotographyDetails.city : '', Validators.required),
      zipcode: new FormControl(this.PhotographyDetails ? this.PhotographyDetails.zipcode : '', Validators.required),

    }
     )

    this.FoodCateringDetails = JSON.parse(window.localStorage.getItem('FoodCateringDetails'));
    this.FoodCateringForm = this._fb.group({
      studioName: new FormControl(this.PhotographyDetails ? this.PhotographyDetails.studioName : '', Validators.required),


    }
    )



  }

}
