import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  sidebarVisible: boolean = false;

  constructor() { }
  message = 'Hello from Parent!';

  ngOnInit(): void {

  }

}
