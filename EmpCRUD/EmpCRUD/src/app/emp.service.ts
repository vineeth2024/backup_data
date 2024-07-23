import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Employee } from './employee.contract';

@Injectable({
  providedIn: 'root'
})
export class EmpService {

  constructor(private http:HttpClient) { }

  header = new HttpHeaders()
  .set('content-type','application/json')
  .set('Access-Control-Allow-Origin',"*");

  public baseUrl:string = "http://localhost:60443/api/EmpApi";

  public GetAllEmpData():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.baseUrl,{headers:this.header});
  }

  public GetEmpDataBasedOnID(id:any):Observable<Employee>{
    return this.http.get<Employee>(this.baseUrl+"/"+id,{headers:this.header});
  }

  public InsertEmp(emp:Employee):Observable<string>{
    return this.http.post<string>(this.baseUrl,emp,{headers:this.header});
  }

  public UpdateEmp(emp:Employee):Observable<string>{
    return this.http.put<string>(this.baseUrl,emp,{headers:this.header});
  }

  public DeleteEmp(id:any):Observable<string>{
    return this.http.delete<string>(this.baseUrl+"/"+id,{headers:this.header});
  }

}
