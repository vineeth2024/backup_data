import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiServiceService } from '../api-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isPasswordVisible = false;
  loginform!:FormGroup

  submitted = false
  disable :boolean=false
  enable:boolean=true
  constructor(
    private route:Router,
    private messageservice:MessageService,
    private apiserviceservice:ApiServiceService
  ) { }

  ngOnInit(): void {
    this.loginform = new FormGroup({
      email :new FormControl("",[Validators.required,]),
     otp:new FormControl("",Validators.required,),
     password:new FormControl("",[Validators.required,Validators.minLength(8)])
    })
  }
  otp(){
    // if (this.loginform.valid) {
    //   this.messageservice.add({ severity: 'success', summary: 'Success Message', detail: 'Invoice Created Successfully' });
    //   this.disable = true

    // } else {
    //   this.disable = false

    //   this.messageservice.add({ severity: 'error', summary: 'Error Message', detail: 'Please Fill Mandatory Fields' });
    // }
    const obj:any={
      "email" :this.loginform.controls['email'].value,
      "password":this.loginform.controls['password'].value}
    this.apiserviceservice.sendotp(obj).subscribe((data:any)=>{
      this.messageservice.add({ severity: 'success', summary: 'Success Message', detail: 'OTP Sent Succesfully' });

        this.disable = true
        this.enable = false
      },
      (err: any) => {

        this.disable = false

        this.messageservice.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });
      }
    )}

  

    
  
  login(){
    // this.submitted = true
    // if(this.loginform.invalid){
    //   return this.messageservice.add({ severity: 'error', summary: 'Error Message', detail: 'Please Fill Mandatory Fields' });
    // }
    if (!this.loginform.controls['otp'].value) {
    return this.messageservice.add({ severity: 'error', summary: 'Error Message', detail: 'Please Fill Mandatory Fields' });
  } else {
  }
    const obj:any={
      "otp" :this.loginform.controls['otp'].value

    }
    this.apiserviceservice.dashboadcount(obj).subscribe((data: any) => {
      this.messageservice.add({ severity: 'success', summary: 'Success Message', detail: 'OTP Verified Successfully' });
    
      // Route navigation should be performed here, after the response is processed.
      this.route.navigate(['/dashboard']);
    }
    )

  }
}    


