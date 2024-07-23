import { Component } from '@angular/core';
import { Employee } from '../employee.contract';
import { EmpService } from '../emp.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  public empId:string|null = null;
  public employee:Employee = {
    Eno:0,
    Ename:"",
    Job:"",
    Salary:0,
    Dname:""
  };
  public response:string|null = null;

  constructor(private serv:EmpService,private route:ActivatedRoute){}

  ngOnInit(){
    this.empId = this.route.snapshot.paramMap.get('id');
    this.serv.GetEmpDataBasedOnID(this.empId).subscribe(data=>{
      this.employee = data;
    });
  }

  UpdateEmpData(employee:Employee){
    this.serv.UpdateEmp(employee).subscribe(data=>{
      this.response = data;
    });
  }

}
