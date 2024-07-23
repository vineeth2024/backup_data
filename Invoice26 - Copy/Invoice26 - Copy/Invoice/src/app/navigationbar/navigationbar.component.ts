import { Component, Input, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { values } from 'pdf-lib';
@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css']
})
export class NavigationbarComponent implements OnInit {
  productdetails:any
  @Input() invoiceData: any; // Define the invoice data property

  constructor(
    private apiservice:ApiServiceService,

  ) { }
  
  ngOnInit(): void {
    // this.getproductdetails(id)
    
  }
  
}