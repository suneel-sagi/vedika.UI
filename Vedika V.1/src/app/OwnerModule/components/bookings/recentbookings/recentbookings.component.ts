import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookingService } from 'src/app/OwnerModule/services/booking.service';
import { RecentService } from './recent.service';


@Component({
  selector: 'app-recentbookings',
  templateUrl: './recentbookings.component.html',
  styleUrls: ['./recentbookings.component.css']
})
export class RecentbookingsComponent implements OnInit {
  booking:any ={};
  data:any ={};
  constructor(private http: HttpClient,
    private recentservice: RecentService) { }

  ngOnInit(): void {
   
    this.getrecentbookings();
  }

getrecentbookings(){
  this.recentservice.getRecentbookings().subscribe(res =>{
    console.log(res.data[0])
    this.data = res.data[0];
  })
}
}