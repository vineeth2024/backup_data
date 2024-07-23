import { Component } from '@angular/core';

@Component({
  selector: 'app-templateform-basic',
  templateUrl: './templateform-basic.component.html',
  styleUrls: ['./templateform-basic.component.css']
})
export class TemplateformBasicComponent {
  public Register(data:any){
    alert(JSON.stringify(data));
  }
}
