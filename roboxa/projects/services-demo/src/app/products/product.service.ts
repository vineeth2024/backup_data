import { Injectable } from '@angular/core';
import { ProductDetails } from 'projects/data-binding/src/app/product.contract';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private _http:HttpClient) { }

  public GetProducts() :Observable<ProductDetails[]>{
    return this._http.get<ProductDetails[]>('https://fakestoreapi.com/products');
  }
  
  
  
}



