import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators, FormArray } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-profile-grid',
  templateUrl: './admin-profile-grid.component.html',
  styleUrls: ['./admin-profile-grid.component.css']
})
export class AdminProfileGridComponent implements OnInit {
  displayDialog: boolean = false;

  productForm:any
  searchText: any
  items: MenuItem[] | undefined;
  getinvoicedata: any;
  invoicedetails: any[] = [];
  allinvoicedata: any;
  totalCount = 0

  


  constructor(
    private route:Router,
    private apiserviceservice:ApiServiceService
  ) { }

  ngOnInit(): void {
    this.getinvoice()
    this.items = [{ label: 'Dashboard', routerLink:'/dashboard' }, { label: 'Invoice' }];

    
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    if (filterValue === '') {
      this.invoicedetails = this.allinvoicedata;
    }

    else {
      this.invoicedetails = this.allinvoicedata.filter(
        (invoice: any) =>
          (invoice.product_name && invoice.product_name.toLowerCase().includes(filterValue)) ||
          (invoice.product_cost && invoice.product_cost.toLowerCase().includes(filterValue)) 
       
      );
    }
  }
   
    addinvoice() {
      this.route.navigate(['/invoice'])
  }
  edit(id: string, val: string) {
    this.route.navigate(['/invoice', id, val])
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

  getinvoice() {
    this.getinvoicedata = this.apiserviceservice.viewinvoice().subscribe(
      (data: any) => {
        console.log(data)
        this.invoicedetails = data;
        this.allinvoicedata = data;
        this.totalCount = this.getinvoicedata.length;
      },
      (error: any) => {
        // Handle error here if needed
      }
    );
  }
  
}
