import { Component } from '@angular/core';

@Component({
  selector: 'app-temp-form-validations',
  templateUrl: './temp-form-validations.component.html',
  styleUrls: ['./temp-form-validations.component.css']
})
export class TempFormValidationsComponent {
  public errorMsg:string="";
  public CityChanged(e:any){
    if(e.target.value==" "){
      this.errorMsg = "Please select the city";
    }
    else{
      this.errorMsg = "";
    }
  }
}
