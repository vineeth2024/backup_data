import { Injectable } from '@angular/core';
import { endPointsUser } from './apifile';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  static updatecustomer(id: any) {
    throw new Error('Method not implemented.');
  }
  static viewcustomer() {
    throw new Error('Method not implemented.');
  }
  [x: string]: any;
  constructor(private _httpClient: HttpClient) { }



// services for login
postlogin(id:any): Observable<any> {
return this._httpClient.post(endPointsUser.login,id);
}
sendotp(id:any): Observable<any> {
  return this._httpClient.post(endPointsUser.sendotp,id);
  }
dashboadcount(id:any):Observable<any>{
  return this._httpClient.post(endPointsUser.dashboard,id);
}
//services for Accounts
getaccount():Observable<any>{
  return this._httpClient.get(endPointsUser.viewaccounts,);
}
postaccount(id:any):Observable<any>{
  return this._httpClient.post(endPointsUser.addaccounts,id)
}

//services for admin
postadmin(id:any):Observable<any>{
  return this._httpClient.post(endPointsUser.addadmin,id)
}
deleteadmin(id:any):Observable<any>{
  return this._httpClient.delete(endPointsUser.deleteadmin,id)
}
updateadmin(id:any):Observable<any>{
  return this._httpClient.put(endPointsUser.updateadmin,id)
}
//Services for Customers
addcustomer(id:any):Observable<any>{
  return this._httpClient.post(endPointsUser.addcustomer,id)
}
viewcustomer():Observable<any>{
  return this._httpClient.get(endPointsUser.viewcustomer,)
}
updatecustomer(id:any,payload:any):Observable<any>{
  return this._httpClient.post(endPointsUser.updatecustomer+id,payload)
}
deletecustomer(id:any):Observable<any>{
  return this._httpClient.get(endPointsUser.deletecustomer+id)
}
editcustomer(id:any):Observable<any>{
  return this._httpClient.get(endPointsUser.editcustomer+id)
}
//Services for Products
addproduct(id:any):Observable<any>{
  return this._httpClient.post(endPointsUser.addproduct,id)
}
viewproduct():Observable<any>{
  return this._httpClient.get(endPointsUser.viewproduct)
}
deleteproduct(id:any):Observable<any>{
  return this._httpClient.delete(endPointsUser.deleteproduct+id)
}
updateproduct(id:any,payload:any):Observable<any>{
  return this._httpClient.post(endPointsUser.updateproduct+id,payload)
}
editproduct(id:any):Observable<any>{
  return this._httpClient.get(endPointsUser.editproduct+id)
}

//Services for Invoices
Addinvoice(id:any):Observable<any>{
  return this._httpClient.post(endPointsUser.Addinvoice,id)
}
viewinvoice():Observable<any>{
  return this._httpClient.get(endPointsUser.viewinvoice,)
}
deleteinvoice(id:any):Observable<any>{
  return this._httpClient.delete(endPointsUser.deleteinvoice+id)
}
invoiceslip(id:any):Observable<any>{
  return this._httpClient.get(endPointsUser.invoiceslip+id)
}
//Services for User
addUser(id:any):Observable<any>{
  return this._httpClient.post(endPointsUser.addUser,id)
}
viewuser():Observable<any>{
  return this._httpClient.get(endPointsUser.viewuser)
}
deleteuser(id:any):Observable<any>{
  return this._httpClient.delete(endPointsUser.deleteuser+id)
}
updateuser(id:any,payload:any):Observable<any>{
  return this._httpClient.post(endPointsUser.updateuser + id, payload);

}
edituser(id:any):Observable<any>{
  return this._httpClient.get(endPointsUser.edituser+id)
}

}
