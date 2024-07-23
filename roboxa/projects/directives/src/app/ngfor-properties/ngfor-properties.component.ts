import { Component } from '@angular/core';
import { ProductDetails } from '../product.contract';

@Component({
  selector: 'app-ngfor-properties',
  templateUrl: './ngfor-properties.component.html',
  styleUrls: ['./ngfor-properties.component.css']
})
export class NgforPropertiesComponent {
 public products:ProductDetails[]=[];
 constructor(){}
 ngOnInit(){
  fetch('https://fakestoreapi.com/products')
  .then(data=>data.json())
  .then(data=>{
    this.products=data;
  })
 }
}
