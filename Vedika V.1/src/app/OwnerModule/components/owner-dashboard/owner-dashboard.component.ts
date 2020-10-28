import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.css']
})
export class OwnerDashboardComponent implements OnInit {
  temp;
  data = [];
  constructor(private router: Router,private activatedroute: ActivatedRoute) {
   
   }

  ngOnInit(): void {
    this.activatedroute.params.subscribe(res =>{
      console.log(res);
      this.temp= res.firstname
      console.log(this.temp)
    })
  }

  logout(){
    this.router.navigateByUrl("/header")
  }

}
