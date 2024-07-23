import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  displayDialog: boolean = false;
  role: any;
  dashboardrole: boolean = false;
  adminrole: boolean = false;
  domainrole: boolean = false;
  hostingrole: boolean = false;
  hostdomainrole: boolean = false;
  emailrole: boolean = false;
  itreturnsrole: boolean = false;
  passwordsrole: boolean = false;


  constructor(
    public messageservice:MessageService,
    
    private apiservice:ApiService,
    private router:Router,

    ) { 
      this.role=sessionStorage.getItem('role')
      if(this.role == 'Admin'){
        this.dashboardrole = true;
        this.adminrole = true;
        this.domainrole = true;
        this.hostingrole = true;
        this.hostdomainrole = true;
        this.emailrole = true;
        this.itreturnsrole = true;
        this.passwordsrole = true;
      }
      else if(this.role == 'Hosting'){
        this.domainrole = true;
        this.hostingrole = true;
        this.hostdomainrole = true;
      }
      else if(this.role == 'Email'){
        this.emailrole = true;
      }
      else if(this.role == 'IT Returns'){
        this.itreturnsrole = true;
      }
      
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
    this.router.navigate(['/login'])
  }
  

}
