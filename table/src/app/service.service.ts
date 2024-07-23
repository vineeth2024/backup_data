import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  apiUrl = 'http://localhost:3000/users';
  constructor(private http:HttpClient) { }

  getUsers() {
    return this.http.get(this.apiUrl);
  }

  addUser(user: any) {
    return this.http.post(this.apiUrl, user);
  }

  updateUser(user: any) {
    return this.http.put(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  
}
