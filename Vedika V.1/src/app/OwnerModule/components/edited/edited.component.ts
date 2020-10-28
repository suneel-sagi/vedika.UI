import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/OwnerModule/services/localstorage.service';
import { EditedService } from '../edited/edited.service';
import { SessionStorageService } from 'src/app/OwnerModule/services/sessionstorage.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-edited',
  templateUrl: './edited.component.html',
  styleUrls: ['./edited.component.css']
})
export class EditedComponent implements OnInit {

  // @Input() LocationForm;
  // @Input() DetailsForm;
  // @Input() AccountdetailsForm;

// ==========location======
// =======================
LocationForm: FormGroup;

  locationDetails:any;
  value: string;
  countryInfo=[]; 
  stateInfo=[];
  cityInfo=[];
  countryDetails=[];
// =============================
//     Details
// ==========================

  DetailsForm: FormGroup;
  Details:any;
// ===============AccountDetails==============
  
  AccountdetailsForm:FormGroup ;
  OwnerAccountdetails :any;
  bankInfo = [];
  bankbranchInfo: any;
  bankbranchIfscInfo: any;
  selBankName;

// =============photos===========
  urls = [];
  data = [];

  // ===========================
  constructor(private router: Router,
    private _fb:FormBuilder,
    private localstorageservice: LocalStorageService,
    private service: EditedService,
    private sessionstorageservice: SessionStorageService,
    private publishser: EditedService,
    private photosservice: EditedService,
    ) { }

  ngOnInit(): void {
    this.locationDetails = JSON.parse(window.localStorage.getItem('locationDetails'));
    this.Details = JSON.parse(window.localStorage.getItem('Details'));
    this.OwnerAccountdetails = JSON.parse(window.sessionStorage.getItem('OwnerAccountdetails'));


    // ========================location=====================

    this.LocationForm = this._fb.group({
     name: new FormControl(this.locationDetails ? this.locationDetails.name: '', Validators.required),        
     state: new FormControl(this.locationDetails ? this.locationDetails.state : '', Validators.required),
     city: new FormControl(this.locationDetails ? this.locationDetails.city: '', Validators.required),
     streetAddress: new FormControl(this.locationDetails ? this.locationDetails.streetAddress: '', Validators.required),
     zipcode: new FormControl(this.locationDetails ? this.locationDetails.zipcode: '', Validators.required),
    });

    // =================================details=========================
    this.DetailsForm = this._fb.group({

      name: new FormControl(this.Details ? this.Details.name : '', Validators.required),
      ownerFirstName: new FormControl(this.Details ? this.Details.ownerFirstName : '', Validators.required),
      ownerLastName: new FormControl(this.Details ? this.Details.ownerLastName : '', Validators.required),
      functionhallPrice: new FormControl(this.Details ? this.Details.functionhallPrice : '', Validators.required),
      correlationId: new FormControl(this.Details ? this.Details.correlationId : '', Validators.required),
      functionhalldescription: new FormControl(this.Details ? this.Details.functionhalldescription : '', Validators.required),
      functionhalltype: new FormControl(this.Details ? this.Details.functionhalltype : '', Validators.required),
      maximumguest: new FormControl(this.Details ? this.Details.maximumguest : '', Validators.required),
      briderooms: new FormControl(this.Details ? this.Details.briderooms : '', Validators.required),
      // AMENITIES
      parking: new FormControl(this.Details ? this.Details.parking : '', Validators.required),
      internet: new FormControl(this.Details ? this.Details.internet : '', Validators.required),
      nosmoking: new FormControl(this.Details ? this.Details.nosmoking : '', Validators.required),
      airconditioning: new FormControl(this.Details ? this.Details.airconditioning : '', Validators.required),
      lightingsystem: new FormControl(this.Details ? this.Details.lightingsystem : '', Validators.required),
      dancefloor: new FormControl(this.Details ? this.Details.dancefloor : '', Validators.required),
      noalcohol: new FormControl(this.Details ? this.Details.noalcohol : '', Validators.required),
      soundsystem: new FormControl(this.Details ? this.Details.soundsystem : '', Validators.required),
      //eventType
      banquethall: new FormControl(this.Details ? this.Details.banquethall : '', Validators.required),
      partyroom: new FormControl(this.Details ? this.Details.partyroom : '', Validators.required),
      conference: new FormControl(this.Details ? this.Details.conference : '', Validators.required),
      performance: new FormControl(this.Details ? this.Details.performance : '', Validators.required),
      weddinghall: new FormControl(this.Details ? this.Details.weddinghall : '', Validators.required),
      eventspace: new FormControl(this.Details ? this.Details.eventspace : '', Validators.required),
      nightclub: new FormControl(this.Details ? this.Details.nightclub : '', Validators.required),

    }
    )
// =======================accountDetails=====================================


    this.AccountdetailsForm = this._fb.group({
      accountNumber: new FormControl(this.OwnerAccountdetails ? this.OwnerAccountdetails.accountNumber : '', Validators.pattern('[0-9 -()+]+$')),
      accountName: new FormControl(this.OwnerAccountdetails ? this.OwnerAccountdetails.accountName : '', Validators.required),
      accountType: new FormControl(this.OwnerAccountdetails ? this.OwnerAccountdetails.accountType : '', Validators.required),
      bank: new FormControl(this.OwnerAccountdetails ? this.OwnerAccountdetails.bank : '', Validators.required),
      branch: new FormControl(this.OwnerAccountdetails ? this.OwnerAccountdetails.branch : '', Validators.required),
      ifsc: new FormControl(this.OwnerAccountdetails ? this.OwnerAccountdetails.ifsc : '', Validators.required),
      panNumber: new FormControl(this.OwnerAccountdetails ? this.OwnerAccountdetails.panNumber : '', Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$')),
      Tandc: new FormControl(this.OwnerAccountdetails ? this.OwnerAccountdetails.Tandc : '', Validators.required),
    });

  this.getBankDetails();
  }
// =======================location=====================================
  getCountry(name) {
    console.log(name)
    this.service.getCountry(name).subscribe(data => {
      console.log(data.data[0].countryDetails.name);
      this.countryInfo = data.data[0].countryDetails.name;
      console.log(this.countryInfo);
    })
  }

  getStates(value){
    console.log(value)
    this.service.getStates(value).subscribe(data =>{
      console.log(data)
      console.log(data.data[0].countryDetails.states);
       this.stateInfo =data.data[0].countryDetails.states;
       console.log(this.stateInfo)
    })
}
getCities(value){
  console.log(value)
  this.service.getCity(value).subscribe(cities =>{
    console.log(cities.data[0].countryDetails.states);
    this.cityInfo = cities.data[0].countryDetails.states[0].cities;
    console.log(this.cityInfo);
  })
}

Locationonclick() {
  this.locationDetails = {
    country: this.LocationForm.get('name').value,
    state: this.LocationForm.get('state').value,
    city: this.LocationForm.get('city').value,
    streetAddress: this.LocationForm.get('streetAddress').value,
    zipcode: this.LocationForm.get('zipcode').value,

  }
//   this.location.addLocation(this.OwnerLocation).subscribe(
//     (data:LocationModel) => {
//       console.log(data);
//     },
// (error: any) => console.log(error)

//       )
          this.localstorageservice.set("locationDetails",this.locationDetails);
  // this.router.navigateByUrl("/details");
console.log("LOCDATA");

  

}
// ===================================details=========================

Detailsonclick() {

  this.Details = {

    name: this.DetailsForm.get('name').value,
    ownerFirstName: this.DetailsForm.get('ownerFirstName').value,
    ownerLastName: this.DetailsForm.get('ownerLastName').value,
    functionhalldescription: this.DetailsForm.get('functionhalldescription').value,
    functionhalltype: this.DetailsForm.get('functionhalltype').value,
    functionhallPrice: this.DetailsForm.get('functionhallPrice').value,
    correlationId: this.DetailsForm.get('correlationId').value,
    maximumguest: this.DetailsForm.get('maximumguest').value,
    briderooms: this.DetailsForm.get('briderooms').value,
    // AMENITIES
    parking: this.DetailsForm.get('parking').value,
    internet: this.DetailsForm.get('internet').value,
    nosmoking: this.DetailsForm.get('nosmoking').value,
    airconditioning: this.DetailsForm.get('airconditioning').value,
    lightingsystem: this.DetailsForm.get('lightingsystem').value,
    noalcohol: this.DetailsForm.get('noalcohol').value,
    soundsystem: this.DetailsForm.get('soundsystem').value,
    dancefloor: this.DetailsForm.get('dancefloor').value,
    //eventType
    banquethall: this.DetailsForm.get('banquethall').value,
    partyroom: this.DetailsForm.get('partyroom').value,
    conference: this.DetailsForm.get('conference').value,
    performance: this.DetailsForm.get('performance').value,
    weddinghall: this.DetailsForm.get('weddinghall').value,
    eventspace: this.DetailsForm.get('eventspace').value,
    nightclub: this.DetailsForm.get('nightclub').value,



    // eventType: new FormControl(this.OwnerDetails ? this.OwnerDetails.eventType : ''),

  //   imageUrl: [
  
  // ]



  }



  // }

  // this.details.addDetails(this.OwnerDetails).subscribe(
  //   (data: DetailsModel) => {
  //     console.log(data);

  //   },
  //   (error: any) => console.log(error)
  // )
  this.localstorageservice.set("Details", this.Details);
  // this.router.navigateByUrl("/photos");
}

// =================================photos=================================

onFileChange(event) {
  if (event.target.files && event.target.files[0]) {
    var filesAmount = event.target.files.length;
    for (let i = 0; i < filesAmount; i++) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.urls.push(event.target.result);
      }
      reader.readAsDataURL(event.target.files[i]);
      this.data.push(event.target.files[i])
    }
  }
}

// back() {
//   this.router.navigateByUrl("/details")
// }

PhotosonClick() {
  
  // console.log(this.urls)
  
  for (let i = 0; i < this.data.length; i++) {
    const formData = new FormData();
    formData.append('file', this.data[i]);
    this.service.postFile(formData).subscribe(data => {
      console.log(data)
    });
    this.urls.push(formData);
    console.log(this.urls)
    // this.localstorageservice.set("ownerPhotos",this.urls);
  }
  
  // this.router.navigateByUrl("/security")
}

// ================================accountDetails==============================
getBankDetails() {
  this.service.getBanks().subscribe(data => {
    console.log(data);
    this.bankInfo = data.data;
    console.log(this.bankInfo);
  })
}
getBranches(value) {
  this.selBankName = value
  this.service.getBranches(value).subscribe(branch => {
    console.log(branch.data)
    this.bankbranchInfo = branch.data;
  })
}
getIFSC(value) {
  console.log(this.selBankName, value)
  this.service.getBranchIfsc(this.selBankName, value).subscribe(branch => {
    console.log(branch.data)
    this.bankbranchIfscInfo = branch.data;
  })
}
bankDetailsonclick() {
  this.OwnerAccountdetails = {
    accountNumber: this.AccountdetailsForm.get('accountNumber').value,
    accountName: this.AccountdetailsForm.get('accountName').value,
    accountType: this.AccountdetailsForm.get('accountType').value,
    bank: this.AccountdetailsForm.get('bank').value,
    branch: this.AccountdetailsForm.get('branch').value,
    ifsc: this.AccountdetailsForm.get('ifsc').value,
    panNumber: this.AccountdetailsForm.get('panNumber').value,
    Tandc: this.AccountdetailsForm.get('Tandc').value,
  }
  this.sessionstorageservice.set("OwnerAccountdetails", this.OwnerAccountdetails);
  // this.accountDetails.addAccountDetails(this.OwnerAccountdetails).subscribe(
  //   (data: accountDetailsModel) => {
  //     console.log(data);
  //     // this.sessionstorageservice.set("OwnerPaymentdetails", this.OwnerPaymentdetails);
  //   },
  //   (error: any) => console.log(error)
  // )
  console.log("PAYDET22");
  // this.router.navigateByUrl("/publishlisting")
}
// =======================================publish===================================
publishonClick(){
  var data:any={};
  data.ownerId="1";
  data.correlationid="131";
  data.location=localStorage.getItem("locationDetails");
  data.details=localStorage.getItem("Details");
  
  data.accountDetails=sessionStorage.getItem("OwnerAccountdetails");
  console.log("from session");
  var myobj:any = {
    ownerId(ownerId: number) {
      if (ownerId === 0) {
        this.ownerId = {
          ownerId: null,
         
        };
      } else {
       
          (err: any) => console.log(err)
      }
    },
    "corelationId":123,
    "location":JSON.parse(localStorage.getItem("locationDetails")),
    "details":JSON.parse(localStorage.getItem("Details")),
    // "photos":JSON.parse(localStorage.getItem("ownerPhotos")),
    "accountDetails":JSON.parse(sessionStorage.getItem("OwnerAccountdetails")),

    
 };
 function escapeSpecialChars(jsonString) {
  return jsonString.replace("\\\"", "\"");
}
 console.log("PUBLISHLISTING");

 
  this.publishser.pubList(myobj).subscribe((myobj)=>{

    error: error => console.error('There was an error!', error)
  })
}

onclickokay(){
  var data:any = {};
  data.photos = localStorage.getItem("ownerPhotos");
  var myobj:any ={
     "photos":JSON.parse(localStorage.getItem("ownerPhotos")),

  }
      this.photosservice.postFile(data).subscribe(data => {
    console.log(data)
  });
  this.router.navigateByUrl("/owner-dashboard")

  console.log("PUBLISHLISTING");
}
}



