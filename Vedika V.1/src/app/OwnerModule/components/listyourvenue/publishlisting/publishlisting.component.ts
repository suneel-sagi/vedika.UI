import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LocationModel } from 'src/app/OwnerModule/models/location.model';
import { DetailsModel } from 'src/app/OwnerModule/models/details.model';
import { accountDetailsModel } from 'src/app/OwnerModule/models/accountDetails.model';
import { PublishListingModel } from 'src/app/OwnerModule/models/publishlisting.model';
import { photos } from 'src/app/OwnerModule/models/photos.model';
import { ownerServices } from 'src/app/OwnerModule/services/ownerServices';


@Component({
  selector: 'app-publishlisting',
  templateUrl: './publishlisting.component.html',
  styleUrls: ['./publishlisting.component.css']
})
export class PublishlistingComponent implements OnInit {

  @Input() LocationForm;
  @Input() DetailsForm;
  @Input() AccountdetailsForm;
  location:LocationModel[]=[];
  details: DetailsModel[] = [];
  photos: photos[] = [];
  accountDetails: accountDetailsModel[] = [];
  publishListing:PublishListingModel[] = [];
  constructor(private router: Router,
    // private sessionstorageservice: SessionStorageService,
    // private localstorageservice: LocalStorageService,
  
    private publishser: ownerServices,
    private photosservice: ownerServices,
    
    ) { }

  ngOnInit(): void {
  }
  onPublish(){
    var data:any={};
    data.ownerId="1";
    data.correlationid="131";
    data.location=localStorage.getItem("OwnerLocation");
    data.details=localStorage.getItem("OwnerDetails");
    
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
      "location":JSON.parse(localStorage.getItem("OwnerLocation")),
      "details":JSON.parse(localStorage.getItem("OwnerDetails")),
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
  back() {
    this.router.navigateByUrl("/accountdetails")
  }
  onclick(){
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