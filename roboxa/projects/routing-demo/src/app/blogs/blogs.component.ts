import { Component } from '@angular/core';
import { ProductDetails } from 'projects/directives/src/app/product.contract';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent {
  public products:ProductDetails[]=[];
  ngOnInit(){
    fetch('https://fakestoreapi.com/products')
    .then(x=>x.json())
    .then(x=>{
      this.products=x;
    })
  }

}
