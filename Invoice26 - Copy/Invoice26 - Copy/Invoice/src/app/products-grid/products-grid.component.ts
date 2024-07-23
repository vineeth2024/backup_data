import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormArray,FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.css']
})
export class ProductsGridComponent implements OnInit {
  productForm:any
  searchText: any
  items: MenuItem[] | undefined;
  getproductdata: any;
  productdetails: any[] = [];
  allproductdata: any;
  totalCount = 0
  page = 1;
  pageSize = 10;
  displayDialog: boolean = false;



  constructor(
    private route:Router,
    private apiserviceservice:ApiServiceService
  ) { }

  ngOnInit(): void {
    this.getProduct()
    this.items = [{ label: 'Dashboard', routerLink:'/dashboard' }, { label: 'Product' }];

    
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
  
    if (filterValue === '') {
      this.productdetails = this.allproductdata;
    } else {
      this.productdetails = this.allproductdata.filter((product: any) => {
        const productIdString = product.product_id.toString();
        const productCostString = product.product_cost.toString();
  
        return (
          (product.product_name && product.product_name.toLowerCase().includes(filterValue)) ||
          (productIdString && productIdString.includes(filterValue)) ||
          (productCostString && productCostString.includes(filterValue))
        );
      });
    }
  }
  
  
   
  
   
    addproduct() {
      this.route.navigate(['/product'])
  }
  edit(id: string) {
    this.route.navigate(['/product', id])
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

  pageChange(event: number) {
    this.page = event;
     this.getProduct()
   }
  getProduct() {
    this.getproductdata = this.apiserviceservice.viewproduct().subscribe(
      (data: any) => {
        this.productdetails = data.data;
        console.log( this.productdetails)
        this.allproductdata = data.data;
        this.totalCount = this.getproductdata.length;
      },
      (error: any) => {
        // Handle error here if needed
      }
    );
  }
 
 
  deleteproduct(id:any){

    this.apiserviceservice.deleteproduct(id).subscribe((data:any)=>{
      
      (data: any) => {
        this.route.navigate(['/product-grid'])

        console.log(data)
        // this.messageservice.add({ severity: 'success', summary: 'Success Message', detail: 'Test Results Deleted Successfully' });
        this.getProduct()
      }

  })
}
}