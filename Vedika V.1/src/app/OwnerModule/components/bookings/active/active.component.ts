import { Component, OnInit } from '@angular/core';
 import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.css']
})
export class ActiveComponent implements OnInit {
  

  constructor(private http: HttpClient) { }
  url="http://localhost:8057/api/recentlybooked?ownerId=kumar";
  httpData:any;
  ngOnInit() {
    this.http.get(this.url).subscribe(data => {
      this.httpData=data;
    })

  }

}