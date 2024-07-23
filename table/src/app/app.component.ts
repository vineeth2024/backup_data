import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'table';

  users: any[] = [];
  newUser: any = {};
  lastUsedId: number = 0;


  constructor(private service: ServiceService){}

  ngOnInit(): void {
    this.getUsers();
  }
  // getUsers() {
  //   this.service.getUsers().subscribe((data: any) => {
  //     this.users = data;
  //   });
  // }
  getUsers() {
    this.service.getUsers().subscribe((data: any) => {
      this.users = data;
      // Find the maximum ID in the current list of users
      const maxId = Math.max(...this.users.map(user => +user.id));
      // Set the last used ID to the maximum ID found
      this.lastUsedId = maxId || 0;
    });
  }

  addUser() {
    // Increment the last used ID
    this.lastUsedId++;
    // Assign the incremented ID to the new user
    this.newUser.id = this.lastUsedId.toString();
    
    // Add the new user
    this.service.addUser(this.newUser).subscribe(() => {
      this.getUsers();
      this.newUser = {}; // Reset new user
    });
  }

  updateUser(user: any) {
    this.service.updateUser(user).subscribe(() => {
      this.getUsers();
    });
  }

  deleteUser(id: number) {
    this.service.deleteUser(id).subscribe(() => {
      this.getUsers();
    });
  }
  
}
