import { Component, Input, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators, FormArray } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { InvoiceService } from '../invoice-grid/invoice.service';
@Component({
  selector: 'app-invoiceadd',
  templateUrl: './invoiceadd.component.html',
  styleUrls: ['./invoiceadd.component.css']
})
export class InvoiceaddComponent implements OnInit {
  buttonanable:boolean =true
  buttondisnable:boolean =false
  productForm!:any
  submitted = false
  base64String: any;
  autoCode = '';
  invoiceaddform!:FormGroup
  productid: Array<any> = [];
  hsn_no: Array<any> = [];
  productdata: any;
  invoicedetails: [] = [];
  productedit:any
  notifierEmails: [] = []
  productdetails:any
  allproductdetails:any
  totalCount: number | undefined;
  customerdetails: any;
  allcustomerdetails: any;
  productcost1: any;
  cards: any;
  selectedOption: any;
  displayDialog: boolean = false;
  constructor(
    private fb:FormBuilder,
    private messageservice:MessageService,
    private apiserviceservice:ApiServiceService,
    private route:Router,
    private invoiceservice:InvoiceService
  ) {}

  ngOnInit(): void {
    this.apiserviceservice.viewproduct().subscribe((data:any)=>{
 this.productdetails =data
 console.log(data)
this.invoiceaddform
    })
    this.getinvoicedetails()
    this.invoiceaddform = this.fb.group({
      customer_name: new FormControl('',[ Validators.required,Validators.pattern(/^[A-Za-z ]+$/)]),
      purchase_order: new FormControl('', Validators.required),
      vendor_code: new FormControl('', Validators.required),
      invoice_date: new FormControl('', Validators.required),
      invoice_no:new FormControl('',Validators.required),
    
    });
    this.productForm = this.fb.group({ 
      products: this.fb.array([]), 
    });
 
    this.apiserviceservice.viewproduct().subscribe((data:any)=>{
      this.productdetails = data.data;
      this.allproductdetails = data.data;
      console.log(this.productdetails)
      this.totalCount = this.productdetails.length;
    })
    this.apiserviceservice.viewcustomer().subscribe((data:any)=>{
      this.customerdetails = data.data
      this.allcustomerdetails = data.data
      this.totalCount = this.customerdetails.length
    })

  this.addProduct()
 
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

  handleOnChange(index: number, val: { product_cost: number, hsn_no: string }): void {
    const productsArray = this.productForm.get('products') as FormArray;
  
    // Ensure the index is valid
    if (index >= 0 && index < productsArray.length) {
      const productGroup = productsArray.at(index) as FormGroup;
  
      // Update the form control values
      productGroup.get('product_cost')?.setValue(val.product_cost);
      productGroup.get('hsn_no')?.setValue(val.hsn_no);
    }
  }
  onProductSelected(event: any, productIndex: number) {
    if (event.target) {
      const selectedValue = event.target.value;
      console.log(selectedValue);
  
      // Assuming you have a variable 'productArray' storing the products
      const selectedProduct = this.productdetails.find((product: { hsn_no: any; }) => product.hsn_no === selectedValue);
  
      if (selectedProduct) {
        this.handleOnChange(productIndex, selectedProduct);
      } else {
        console.log('Selected product not found');
      }
    } else {
      console.log('event.target is null');
    }
  }
  








//   onProductSelected(event: any, cardIndex: number, rowIndex: number) {
//     const selectedValue = event.target.value;
//     const cardForm = this.cards[cardIndex].form;
//     this.selectedOption = this.productid.find((option) => option.cost_per_unit === selectedValue);
//     if (this.selectedOption) {
//       const selectedName = this.selectedOption.name;
//       console.log(selectedName)
//       const rowFormArray = this.getRows(cardIndex);
//       const rowFormGroup = rowFormArray?.at(rowIndex) as FormGroup;

//       rowFormGroup.get('product')?.setValue(selectedName);


// }
//   }
  
//   getRows(cardIndex: number): FormArray {
//     const card = this.cards[cardIndex];

//     console.log(card)
//     return card.form.get('products') as FormArray;
//   }
  getinvoicedetails(){
    this.apiserviceservice.viewinvoice().subscribe((data:any) =>{
      this.invoicedetails =data.data.length +1
      console.log(this.invoicedetails)
      this.autoCode = 'INV/23/' +this.invoicedetails
      this.invoiceaddform.controls['invoice_no'].setValue(this.autoCode)
      
    },
    (err: any) => {
      this.messageservice.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });
    }
    )
  }
  
    addProduct() {
      const productGroup = this.fb.group({
        hsn_no: [''],
        purchase_date: [''],
        no_of_units: [''],
        product_cost: ['']
      });
      this.productForm.get('products').push(productGroup);
    }
    removeProduct(i: number) {
      (this.productForm.get('products') as FormArray).removeAt(i);
    }
    get productControls() {
      return (this.productForm.get('products') as FormArray).controls;
    }
    
    
    submit() {
      if (this.invoiceaddform.valid && this.productForm.valid) {
        this.messageservice.add({ severity: 'success', summary: 'Success Message', detail: 'Invoice Created Successfully' });
        this.route.navigate(['/invoice-grid'])
      } else {
        this.messageservice.add({ severity: 'error', summary: 'Error Message', detail: 'Please Fill Mandatory Fields' });
      }

   
    
      const obj: any = {
        "customer": this.invoiceaddform.controls['customer_name'].value,
        "purchase_order":this.invoiceaddform.controls['purchase_order'].value,
        "vendor_code":this.invoiceaddform.controls['vendor_code'].value,
        "invoice_date":this.invoiceaddform.controls['invoice_date'].value,
        "invoice_number":this.invoiceaddform.controls['invoice_no'].value,
        "product_details":this.productForm.controls['products'].value,
        // "product_id":this.productForm.controls['product_id'].value,
        // "purchase_date":this.productForm.controls['date'].value,
        // "no_of_units":this.productForm.controls['no_of_units'].value,
        // "product_cost":this.productForm.controls['']
     
      }  
      this.productForm.value.products
      console.log( this.productForm.value.products)
      this.apiserviceservice.Addinvoice(obj).subscribe(
        (data: any) => {
       
      setTimeout(()=>{
        alert('k')
        this.messageservice.add({severity:'success', summary:'Success Message', detail:'Invoice Created Successfully'});
      },1000);
      
      this.route.navigate(['/invoice-grid']);
      
     
    },
    (error: any) => {
      this.messageservice.add({severity:'error', summary:'Error Message', detail:error.error.message});
    }
   )
    }   
}  
