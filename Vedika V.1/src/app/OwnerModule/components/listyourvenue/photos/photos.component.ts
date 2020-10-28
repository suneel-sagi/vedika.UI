import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/OwnerModule/services/localstorage.service';
import { photos } from 'src/app/OwnerModule/models/photos.model';
import { ownerServices } from 'src/app/OwnerModule/services/ownerServices';


@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  urls = [];
  data = [];

  photosmodel: photos[] = [];

  constructor(private router: Router, 
    private photos: ownerServices,

    private localstorageservice: LocalStorageService, ) { }


  ngOnInit(): void {
  }

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

  back() {
    this.router.navigateByUrl("/details")
  }

  next() {
    
    console.log(this.urls)
    
    for (let i = 0; i < this.data.length; i++) {
      const formData = new FormData();
      formData.append('file', this.data[i]);
      this.photos.postFile(formData).subscribe(data => {
        console.log(data)
      });
      this.urls.push(formData);
      console.log(this.urls)
      this.localstorageservice.set("ownerPhotos",this.urls);
    }
    
    this.router.navigateByUrl("/security")
  }
}
