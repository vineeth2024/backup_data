import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pathbreaker';
  firstName:string = "vineeth";
  lastName:string = "telukala";
  email:string = "vineethtelukala2001@gmail.com";
  dob:string = "18/08/2001";
  city:string = "hyd"
}
export interface ProductDetails {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
      rate: number
      count: number
    }
}



