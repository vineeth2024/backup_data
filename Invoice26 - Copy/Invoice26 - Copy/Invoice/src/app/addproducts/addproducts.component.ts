import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApiServiceService } from '../api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit {
  productform!: FormGroup;
  displayDialog: boolean = false;
  value!: string;
  submitted = false
  message!: string;
  items: MenuItem[] | undefined;
  isEdit: boolean= false
  getcustomerdata: any;
  id: any;
  productdetails:any[] = [];
  constructor(
    public messageservice:MessageService,
    private apiserviceservice:ApiServiceService,
    private router:Router,
    private activatedroute:ActivatedRoute,


    ) {
      this.activatedroute.params.subscribe((data: any) => {
        if (data.id) {
          this.isEdit = true;
          this.id = data.id;
          console.log(this.id)
          apiserviceservice.editproduct(data.id).subscribe((data: any) => {
            this.productdetails = data.data
            
            console.log(data.data)
            this.productform.get('product_name')?.patchValue(data.data.product_name)
            this.productform.get('cgst')?.patchValue(data.data.cgst)
            this.productform.get('productcost')?.patchValue(data.data.product_cost)
            this.productform.get('igst')?.patchValue(data.data.igst)
            this.productform.get('sgst')?.patchValue(data.data.sgst)
            this.productform.get('hsn_no')?.patchValue(data.data.hsn_no)
          });
        }
      });}

  ngOnInit(): void {
    this.items = [{ label: 'Dashboard', routerLink:'/dashboard' }, { label: 'Product view', routerLink:'/product-grid' }];
    this.productform = new FormGroup({
      product_name: new FormControl("", [Validators.required]),
      productcost: new FormControl("",Validators.required),
      hsn_no: new FormControl("",Validators.required),
      cgst:new FormControl(""),
      sgst:new FormControl(''),
      igst:new FormControl('')
    })
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

submit(){
  this.submitted = true
  if(this.productform.invalid){
    return this.messageservice.add({ severity: 'error', summary: 'Error Message', detail: 'Please Fill Mandatory Fields' });
  }
 
  const obj:any = {
    "product_name":this.productform.controls['product_name'].value,
    "product_cost":this.productform.controls['productcost'].value,
    "hsn_no":this.productform.controls['hsn_no'].value,
    "cgst":this.productform.controls['cgst'].value,
    "sgst":this.productform.controls['sgst'].value,
    "igst":this.productform.controls['igst'].value
  }
  console.log(obj)
  if(this.isEdit){
    obj.product_id =this.id
    this.apiserviceservice.updateproduct(obj.product_id,obj).subscribe( (data:any)=> {
      setTimeout(() => {
        this.messageservice.add({ severity: 'success', summary: 'Success Message', detail: 'CRO Details Updated Successfully' });
      }, 1000);
  
      this.router.navigate(['/product-grid'])
  }
    )  
}
else {
   this.apiserviceservice.addproduct(obj).subscribe(
    (data: any) => {
    
      setTimeout(()=>{
        this.messageservice.add({severity:'success', summary:'Success Message', detail:'Product Added Successfully'});
      },1000);
      
      this.router.navigate(['/product-grid']);
      
     
    },
    (error: any) => {
      this.messageservice.add({severity:'error', summary:'Error Message', detail:error.error.message});
    }
   )
  }
}
}
