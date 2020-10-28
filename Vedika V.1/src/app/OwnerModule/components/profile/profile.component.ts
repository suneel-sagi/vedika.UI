import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyprofileService } from '../../services/myprofile.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data: any;
  msg:string;
   toggleButton: boolean=true;
  constructor(
    private router: Router,
    private profileservice: MyprofileService,
  
  ) { }

  ngOnInit(): void {
    this.onload();
    this.onsave();
  }

  onload() {
    this.profileservice.getprofile().subscribe(data => {
     console.log(data)
    
      this.data = data
      console.log(this.data)
      
    })
  }

  onsave(){
    console.log(this.data)
    this.profileservice.updateprofile(this.data ).subscribe((data:any) => {
      
       this.msg=data.msg,
       console.log(data)
       
     })

  }
  back() {
    this.router.navigateByUrl("/owner-dashboard");
  }
  enable(){
    this.toggleButton = false
 }

 disable(){
    this.toggleButton = true
 }

}
