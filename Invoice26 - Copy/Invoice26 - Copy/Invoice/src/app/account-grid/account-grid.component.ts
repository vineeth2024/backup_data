import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormArray,FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
@Component({
  selector: 'app-account-grid',
  templateUrl: './account-grid.component.html',
  styleUrls: ['./account-grid.component.css']
})
export class AccountGridComponent implements OnInit {

  productForm:any
  searchText: any
  items: MenuItem[] | undefined;
  allinwarddata: any;
  inwarddetails: any[] = [];
  allinvoicedata: any;
  totalCount = 0
  messageservice: any;
  getaccounts: any;

  


  constructor(
    private route:Router,
    private apiserviceservice:ApiServiceService
  ) { }

  ngOnInit(): void {
    this.getinward()
    this.items = [{ label: 'Dashboard', routerLink:'/dashboard' }, { label: 'Invoice' }];

    
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    if (filterValue === '') {
      this.inwarddetails = this.allinwarddata;
    }
    else {
      this.inwarddetails = this.allinwarddata.filter(
        (inward: any) =>
          (inward.product_name && inward.product_name.toLowerCase().includes(filterValue)) ||
          (inward.product_cost && inward.product_cost.toLowerCase().includes(filterValue)) ||
          (inward.hsn_no && inward.hsn_no.toLowerCase().includes(filterValue))

      );
    }
  }
   
  addinward() {
      this.route.navigate(['/add_inward'])
  }
  edit(id: string) {
    this.route.navigate(['/add_inward', id])
  }
  getinward() {
    this.getaccounts = this.apiserviceservice.getaccount().subscribe(
      (data: any) => {
        this.inwarddetails = data.data;
        // data.data.forEach((customer: any) => {
        // });
  
        this.allinwarddata = data.data;
        this.totalCount = this.getaccounts.length;
  
      
      setTimeout(()=>{
        this.messageservice.add({severity:'success', summary:'Success Message', detail:'Customer Added Successfully'});
      },1000);
      
      this.route.navigate(['/customer-grid']);
      
     
    },
    (error: any) => {
      this.messageservice.add({severity:'error', summary:'Error Message', detail:error.error.message});
    }
  )}
  deleteinward(){

  }

  }





