import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidationErrors, Form, NgForm } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { ApiServiceService } from '../api-service.service';
import { Router ,ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customerform!: FormGroup;
  value!: string;
  submitted = false
  customerid:boolean=false
  isEdit: boolean = false;
  view:boolean =false
  message!: string;
  items: MenuItem[] | undefined;
  gstanable:boolean=false
  public id: any = '';
getcustomerdata:any
customerdetails: any[] = [];
totalcount: any;

  costomerid: any;
  customer: any[] | undefined;
  displayDialog: boolean = false;
  constructor(
    public messageservice:MessageService,
    private apiserviceservice:ApiServiceService,
    private router:Router,
    private activatedroute:ActivatedRoute,
    private httpclient:HttpClient
    ) { 
      this.activatedroute.params.subscribe((data: any) => {
        if (data.id) {
          this.isEdit = true;
          this.id = data.id;
          console.log(data.id)
          apiserviceservice.editcustomer(this.id).subscribe((data) => {
            this.getcustomerdata = data;
           this.customerdetails = data.data
            
            console.log(data.data)
            this.customerform.get('customer_id')?.patchValue(data.data.customer_id)
            this.customerform.controls['customer_id'].disable()
            this.customerform.get('customer_name')?.patchValue(data.data.customer)
            this.customerform.get('email')?.patchValue(data.data.mail_id)
            this.customerform.get('address')?.patchValue(data.data.address)
            this.customerform.get('mobile_no')?.patchValue(data.data.mobilenumber)
            this.customerform.get('state')?.patchValue(data.data.state)
            this.customerform.get('city')?.patchValue(data.data.city)
            this.customerform.get('zipcode')?.patchValue(data.data.pin_code)
            this.customerform.get('gst_no')?.patchValue(data.data.gst_number)
            this.customerform.get('state_code')?.patchValue(data.data.state_code)

          });
          
        }
      })
    }

  ngOnInit(): void {
    
    this.customerform = new FormGroup({
      customer_id:new FormControl(""),
      customer_name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      address: new FormControl("",Validators.required),
      mobile_no: new FormControl("",Validators.required),
      state:new FormControl("",Validators.required),
      city:new FormControl('',Validators.required),
      zipcode:new FormControl('',Validators.required),
      gst_no: new FormControl("",Validators.required),
      state_code: new FormControl("",Validators.required),
    })
  }
  
  showgst(){
    this.gstanable=true
  }
hidegst(){
 this.gstanable = false
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
  if(this.customerform.invalid){
    return this.messageservice.add({ severity: 'error', summary: 'Error Message', detail: 'Please Fill Mandatory Fields' });
  }
 
  const obj:any = {
    "customer_id":this.customerform.controls['customer_id'].value,
    "customer":this.customerform.controls['customer_name'].value,
    "mobilenumber":this.customerform.controls['mobile_no'].value,
    "email":this.customerform.controls['email'].value,
    "address":this.customerform.controls['address'].value,
    "state":this.customerform.controls['state'].value,
    "city":this.customerform.controls['city'].value,
    "pincode":this.customerform.controls['zipcode'].value,
    "gstnumber":this.customerform.controls['gst_no'].value,
    "stateCode":this.customerform.controls['state_code'].value

  }
  if(this.isEdit){
  obj.customer_id = this.id
  this.apiserviceservice.updatecustomer(obj.customer_id,obj).subscribe( (data:any)=> {
    setTimeout(() => {
      this.messageservice.add({ severity: 'success', summary: 'Success Message', detail: 'Customer Updated Successfully' });
    }, 1000);


    this.router.navigate(['/customer-grid'])
  },
)
  }
  else{
   this.apiserviceservice.addcustomer(obj).subscribe(
    (data: any) => {
   
      setTimeout(()=>{
        this.messageservice.add({severity:'success', summary:'Success Message', detail:'Customer Added Successfully'});
      },1000);
      
      this.router.navigate(['/customer-grid']);
      
     
    },
    (error: any) => {
      this.messageservice.add({severity:'error', summary:'Error Message', detail:error.error.message});
    }
   )
  }
}
 
}

