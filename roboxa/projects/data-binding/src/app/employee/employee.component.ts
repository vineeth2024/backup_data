import { Component } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  firstName:string = "Vineeth";
  lastName:string = "Telukala";
  email:string = "vineethtelukula2001@gmail.com"
  dob:string = "18/08/2001";
  city:string = "HYD";
}
