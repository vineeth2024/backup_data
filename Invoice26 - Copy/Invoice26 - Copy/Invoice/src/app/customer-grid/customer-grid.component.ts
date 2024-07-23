import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
@Component({
  selector: 'app-customer-grid',
  templateUrl: './customer-grid.component.html',
  styleUrls: ['./customer-grid.component.css']
})
export class CustomerGridComponent implements OnInit {
  displayDialog: boolean = false;

  productForm:any
  searchText: any
  items: MenuItem[] | undefined;
  getcustomers: any;
  customerdetails: any[] = [];
  allcustomerdata: any;
  totalCount = 0
  page = 1;
  pageSize = 10;
  constructor(
    private route:Router,
    private apiserviceservice:ApiServiceService,
    private messageservice:MessageService,
    private ngzone:NgZone
  ) { }

  ngOnInit(): void {
    this.getinvoice()
    this.items = [{ label: 'Dashboard', routerLink:'/dashboard' }, { label: 'Invoice' }];

    
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    if (filterValue === '') {
      this.customerdetails = this.allcustomerdata;
    }
    else {
      this.customerdetails = this.allcustomerdata.filter(
        (customer: any) =>
          (customer.customer && customer.customer.toLowerCase().includes(filterValue)) ||
          (customer.state && customer.state.toLowerCase().includes(filterValue)) ||
          (customer.city && customer.city.toLowerCase().includes(filterValue))||
          (customer.mail_id && customer.mail_id.toLowerCase().includes(filterValue))||
          (customer.customer_id && customer.customer_id.toString().includes(filterValue))||
          (customer.mobile_number && customer.mobile_number.toString().includes(filterValue))

      );
    }
  }
 
  addinward() {
      this.route.navigate(['/customers'])
  }
  edit(id: string) {
  
    this.route.navigate(['/customers', id])

  }
  pageChange(event: number) {
    this.page = event;
     this.getinvoice()
   }
  getinvoice() {
    this.getcustomers = this.apiserviceservice.viewcustomer().subscribe(
      (data: any) => {
        this.customerdetails = data.data;
        // data.data.forEach((customer: any) => {
        // });
  
        this.allcustomerdata = data.data;
        this.totalCount = this.getcustomers.length;
  
      
      // setTimeout(()=>{
      //   this.messageservice.add({severity:'success', summary:'Success Message', detail:'Customer Added Successfully'});
      // },1000);
      
      // this.route.navigate(['/customer-grid']);
      
     
    },
    (error: any) => {
      this.messageservice.add({severity:'error', summary:'Error Message', detail:error.error.message});
    }
  )}
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

  deletecustomers(id:string,val:string) {
    this.apiserviceservice.deletecustomer(id).subscribe(
      (data: any) => {
        console.log(data)
        this.messageservice.add({ severity: 'success', summary: 'Success Message', detail: 'Customer Deleted Successfully' });
        this.getinvoice()
      });

  }

}

