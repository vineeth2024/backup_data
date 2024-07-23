import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidationErrors, Form, NgForm } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  customerform!: FormGroup;
  submitted = false
  isEdit :boolean=false
  displayDialog: boolean = false;

  id: any;
  admindetails:any[] = [];
  constructor(
    public messageservice:MessageService,
    private apiserviceservice:ApiServiceService,
    private route:Router ,
    private activatedroute:ActivatedRoute
  ) {
    this.activatedroute.params.subscribe((data:any)=>{
  if(data.id){
    this.isEdit = true;
    this.id = data.id;
    console.log(data.id)
    this.apiserviceservice.updateadmin(this.id).subscribe((data:any)=>{
      this.admindetails=data.data
      console.log(this.admindetails)

    })
  }
    })
   }

  ngOnInit(): void {
    this.customerform = new FormGroup({
      client_name : new FormControl("",Validators.required),
      gender:new FormControl ("",Validators.required),
      email:new FormControl("", Validators.required),
      mobile_no:new FormControl("",Validators.required),
      address:new FormControl("",Validators.required),
      state:new FormControl("",Validators.required),
       city:new FormControl(""),
      company_name:new FormControl("",Validators.required),
      pan_no:new FormControl("",Validators.required),
      gst_no:new FormControl("",Validators.required),
      bankaccount_no:new FormControl("",Validators.required),
      bank_name:new FormControl("",Validators.required),
      branch_name:new FormControl("",Validators.required),
      ifsc_code:new FormControl("",Validators.required)
      
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
    this.route.navigate(['/login'])
  }

  submit(){
    this.submitted=true
    if (this.customerform.invalid) {
      Object.keys(this.customerform.controls).forEach((key) => {
        this.customerform.get(key)?.markAsTouched();

      });
      this.messageservice.add({severity:'error', summary:'Error Message', detail:'Please Fill All Mandatory Fields'});
    
    } 
    else{
      const obj:any ={
        client : this.customerform.controls['client_name'].value,
        gender : this.customerform.controls['gender'].value,
        email: this.customerform.controls['email'].value,
        address:this.customerform.controls['address'].value,
        state:this.customerform.controls['state'].value,
        phone:this.customerform.controls['mobile_no'].value,
        company:this.customerform.controls['company_name'].value,
        pan:this.customerform.controls['pan_no'].value,
        gstnumber:this.customerform.controls['gst_no'].value,
        bankAccount:this.customerform.controls['bankaccount_no'].value,
        bankName:this.customerform.controls['bank_name'].value,
        bankBranch:this.customerform.controls['branch_name'].value,
        ifsc:this.customerform.controls['ifsc_code'].value
      } 

      this.apiserviceservice.postadmin(obj).subscribe(
        (data: any) => {

           
          setTimeout(()=>{
            this.messageservice.add({severity:'success', summary:'Success Message', detail:'User Updated Successfully'});
          },1000);
            
             this.route.navigate(['/dashboard']);
          },
          (err: any) => {
            this.messageservice.add({severity:'error', summary:'Error Message', detail:err.error.message});
        
          }
        );
      }
    }

}

