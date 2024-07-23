import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kitsform';
  public frmRegister = new FormGroup({
    Username:new FormControl('Enter Name'),
    Age:new FormControl(0),
    Mobile:new FormControl(''),
  });
  public SubmitClick(data:any){
    alert(JSON.stringify(data));
  }
}
