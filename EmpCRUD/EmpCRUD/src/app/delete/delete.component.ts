import { Component } from '@angular/core';
import { Employee } from '../employee.contract';
import { EmpService } from '../emp.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
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
  DeleteEmp(){
    this.serv.DeleteEmp(this.empId).subscribe(data=>{
      this.response = data;
    })
  }
}
