import { Component } from '@angular/core';
import { Employee } from './employee.contract';
import { EmpService } from './emp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EmpCRUD';
  public employees:Employee[] = [];
  constructor(private serv:EmpService){}

  ngOnInit(){
    this.serv.GetAllEmpData().subscribe(emps=>{
      this.employees = emps
    },(error)=>{
      console.log(error);
    },()=>{
      console.log("API Call done");
    })
  }

}
