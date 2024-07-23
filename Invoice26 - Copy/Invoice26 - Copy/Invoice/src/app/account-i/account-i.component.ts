import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-account-i',
  templateUrl: './account-i.component.html',
  styleUrls: ['./account-i.component.css']
})
export class AccountIComponent implements OnInit {
  isEdit:boolean=false
  inwardform!: FormGroup
  submitted = false
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
    custmonername: this.inwardform.controls['customer_name'].value,
    amount:this.inwardform.controls['amount'].value,
    date:this.inwardform.controls['date'].value
  }
  this.apiserviceservice.postaccount(obj).subscribe( (data: any) => {
    setTimeout(()=>{
      this.messageservice.add({severity:'success', summary:'Success Message', detail:'Inward Added Successfully'});
    },1000);
    
    this.router.navigate(['/a-grid']);
    
   
  },
  (error: any) => {
    this.messageservice.add({severity:'error', summary:'Error Message', detail:error.error.message});
  }

  )}
}}


