import { Component } from '@angular/core';
import { ProductDetails } from '../product.contract';

@Component({
  selector: 'app-ng-if',
  templateUrl: './ng-if.component.html',
  styleUrls: ['./ng-if.component.css']
})
export class NgIfComponent {
  public product:ProductDetails={
    id:0,
    category:"",
    description:"",
    image:'',
    price:0,
    title:"",
    rating:{
      count:0,
      rate:0
    }
  }
  ngOnInit(){
    fetch('https://fakestoreapi.com/products/1')
    .then(data=>data.json())
    .then(data=>{
      this.product = data;
    })
  }

}
