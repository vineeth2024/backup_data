import { Component } from '@angular/core';
import { Employee } from '../employee.contract';
import { EmpService } from '../emp.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent {
  public employee:Employee = {
    Eno:0,
    Ename:"",
    Job:"",
    Salary:0,
    Dname:""
  };
  response:string|null = null;

  constructor(private serv:EmpService){}

  SaveEmpData(emp:Employee){
    this.serv.InsertEmp(emp).subscribe(data=>{this.response = data;});
  }

}
