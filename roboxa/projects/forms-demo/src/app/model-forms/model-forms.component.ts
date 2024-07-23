import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-model-forms',
  templateUrl: './model-forms.component.html',
  styleUrls: ['./model-forms.component.css']
})
export class ModelFormsComponent {
  public frmRegister = new FormGroup({
    Username:new FormControl('Enter Name'),
    Age:new FormControl(0),
    Mobile:new FormControl(''),
    frmVendor:new FormGroup({
      vendorName:new FormControl(''),
      rating:new FormControl(0)
    })
  });

  get VendorName(){
    return this.frmRegister.get('vendorName');
  }
  get VendorRating(){
    return this.frmRegister.get('rating');
  }

  get Age(){
    return this.frmRegister.get('Age');
  }

  public UpdateClick(){
    this.frmRegister.patchValue({
      Age:34,
      frmVendor:{
        vendorName:"ABC info tech"
      }
    })
  }

  public SubmitClick(data:any){
    alert(JSON.stringify(data));
  }

}
