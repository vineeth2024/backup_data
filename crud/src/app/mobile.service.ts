import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class MobileService {

  constructor(private http:HttpClient) { }
  
  url = "http://localhost:5000/mobiles";
  sendEmailUrl = "http://localhost:5000/send-email";

  fetchMobiles(){
    return this.http.get(this.url)
  }
  
  deleteMobile(id){
    return this.http.delete(this.url+"/"+id)
  }

  postMobile(body){
    return this.http.post(this.url,body)
  }

  // putMobile(body){
  //   return this.http.put(this.url,body)
  // }

  putMobile(id, body) {
    return this.http.put(`${this.url}/${id}`, body);
  }

  sendEmail(email: string, id: any) {
    return this.http.post(this.sendEmailUrl, { email, id });
  }
}
