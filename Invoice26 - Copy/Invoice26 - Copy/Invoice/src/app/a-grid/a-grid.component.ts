import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-a-grid',
  templateUrl: './a-grid.component.html',
  styleUrls: ['./a-grid.component.css']
})
export class AGridComponent implements OnInit {
  searchText:any
  allinwarddata: any;
  inwarddetails: any[] = [];
  allinvoicedata: any;
  totalCount = 0
  getaccounts: any;
  getinwarddata:any

  constructor(
    private apiserviceservice:ApiServiceService,
    private messageservice:MessageService,
    private route:Router
  ) { }

  ngOnInit(): void {
    this.getinvoice()
    
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
          (inward.customer_name && inward.customer_name.toLowerCase().includes(filterValue)) ||
          (inward.amount && inward.amount.toLowerCase().includes(filterValue)) ||
          (inward.date && inward.date.toLowerCase().includes(filterValue))

      );
    }
  }
   

addinvoice() {
  this.route.navigate(['/in'])
}
edit(id: string) {
this.route.navigate(['/in', id])
}
getinvoice() {
this.getinwarddata = this.apiserviceservice.getaccount().subscribe(
  (data: any) => {
    console.log(data)
    this.inwarddetails = data.data;
    this.allinvoicedata = data.data;
    this.totalCount = this.inwarddetails.length;
  },
  (error: any) => {
    // Handle error here if needed
  }
);
}

}