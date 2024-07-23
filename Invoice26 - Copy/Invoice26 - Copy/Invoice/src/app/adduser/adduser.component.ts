import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApiServiceService } from '../api-service.service';
import { Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  showPassword = false;
  termsValue: boolean= false
  error: any;
  id:any
  displayDialog: boolean = false;
  router: any;
  isEdit: boolean =false
  userdetails:any
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
  formGroup!: FormGroup;
  submitted = false;
  constructor(
    public messageservice:MessageService,
    private apiserviceservice:ApiServiceService,
    private route:Router ,
    private activatedroute:ActivatedRoute
    ) {
      this.activatedroute.params.subscribe((data:any)=>{
        if (data.id) {
          this.isEdit = true;
          this.id = data.id;
          apiserviceservice.edituser(data.id).subscribe((data: any) => {
            this.userdetails = data.data
            
            console.log(data.data)
            this.formGroup.get('username')?.patchValue(data.data.username)
            console.log(data.data.username)
            this.formGroup.get('email')?.patchValue(data.data.email)
            this.formGroup.get('role')?.patchValue(data.data.role)
            this.formGroup.get('password')?.patchValue(data.data.password)
          
      }
      )} })
     }
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl("", [Validators.required,Validators.pattern(/^[A-Za-z ]+$/)]),
      email: new FormControl("",[Validators.required,Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)?$/)]),
      role: new FormControl("",Validators.required),
      password:new FormControl("",
      [Validators.required, 
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)] ) 
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
  onsubmit(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.formGroup.invalid ) {
      return   this.messageservice.add({ severity: 'error', summary: 'Error Message', detail: 'Please Fill Mandatory Fields' });
    }
    else{
      alert('success')
      this.messageservice.add({ severity: 'success', summary: 'Success Message', detail: 'User Created Successfully' });
       this.route.navigate(['/user-grid'])
    }
      const obj: any = {
        "username": this.formGroup.controls['username'].value,
        "email": this.formGroup.controls['email'].value,
        "role": this.formGroup.controls['role'].value,
        "password": this.formGroup.controls['password'].value,
      } 
      if(this.isEdit){
        obj.user_id = this.id
        this.apiserviceservice.updateuser(obj.user_id,obj).subscribe( (data:any)=> {
          alert('k')
          setTimeout(() => {
            this.messageservice.add({ severity: 'success', summary: 'Success Message', detail: 'User details Updated Successfully' });
          }, 1000);
      
      
          this.router.navigate(['/user-grid'])
        },
      )
        }
        else{
                this.apiserviceservice.addUser(obj).subscribe(
        (data: any) => {
       
      setTimeout(()=>{
        this.messageservice.add({severity:'success', summary:'Success Message', detail:'User Added Successfully'});
      },1000);
      
      this.route.navigate(['/user-grid']);
      
     
    },
    (error: any) => {
      this.messageservice.add({severity:'error', summary:'Error Message', detail:error.error.message});
    }
      
      )
    }
  }
    }
  
    
  

    
  

  


