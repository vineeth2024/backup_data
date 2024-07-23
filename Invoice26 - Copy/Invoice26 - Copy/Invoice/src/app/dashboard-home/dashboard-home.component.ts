import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

import {  Router } from '@angular/router';
@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  dashboardform: any;
  dashboardcount: any;
  displayDialog: boolean = false;

  constructor(
    private apiserviceservice:ApiServiceService,
    private route:Router,
  ) { }

  ngOnInit(): void {
    const obj :any ={
      dashboard : this.dashboardform.controls['dashboard'].value
    }
    this.apiserviceservice.dashboadcount(obj).subscribe((data:any)=>{
     this.dashboardcount =data
     console.log(data)
    }
      
    )
  }
  showDialog() {
    this.displayDialog = true;
  }
  cancelLogout() {
    this.displayDialog = false;
  }
  logout() {
    // Handle logout logic here
    // You can replace this with your actual logout code
    alert('Logging out...');
    // After logging out, close the dialog
    this.displayDialog = false;
    this.route.navigate(['/login'])
  }

}
