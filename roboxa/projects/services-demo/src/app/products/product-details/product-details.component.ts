import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductDetails } from 'projects/data-binding/src/app/product.contract';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  public products:ProductDetails[]=[];
  constructor(private _serv:ProductService){
  }
  ngOnInit(){
    this._serv.GetProducts().subscribe(data=>{
      this.products=data
    });
  }
  
}
export interface ImpotedProductDetails{
  id:number
  title:string
  price:number
  description:string
  category:string
  image:{
      rate:number
      count: number
  }
}

