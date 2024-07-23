import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-inward',
  templateUrl: './account-inward.component.html',
  styleUrls: ['./account-inward.component.css']
})
export class AccountInwardComponent implements OnInit {
  submitted=false
  inwardform!: FormGroup;
  isEdit:boolean =false
  displayDialog: boolean = false;

  constructor(
    public messageservice:MessageService,
    private apiserviceservice:ApiServiceService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.inwardform = new FormGroup({
      customer_name: new FormControl("", [Validators.required]),
      amount: new FormControl("",Validators.required),
      date: new FormControl("",Validators.required),
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
  if (this.inwardform.invalid) {
    Object.keys(this.inwardform.controls).forEach((key) => {
      this.inwardform.get(key)?.markAsTouched();

    });
    this.messageservice.add({severity:'error', summary:'Error Message', detail:'Please Fill All Mandatory Fields'});
  
  } 
  else{
  const obj :any = {
    customer_name: this.inwardform.controls['customer_name'].value,
    amount:this.inwardform.controls['amount'].value,
    date:this.inwardform.controls['date'].value
  }
  this.apiserviceservice.postaccount(obj).subscribe( (data: any) => {
    setTimeout(()=>{
      this.messageservice.add({severity:'success', summary:'Success Message', detail:'Customer Added Successfully'});
    },1000);
    
    this.router.navigate(['/account-grid']);
    
   
  },
  (error: any) => {
    this.messageservice.add({severity:'error', summary:'Error Message', detail:error.error.message});
  }

  )}
}}

