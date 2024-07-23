import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any[] = [];
  public productList = new BehaviorSubject<any[]>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }

  getProducts() {
    return this.productList.asObservable();
  }

  addtoCart(product: any) {
    const existingItem = this.cartItemList.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
      existingItem.total = existingItem.quantity * existingItem.price;
    } else {
      product.quantity = 1;
      product.total = product.price;
      this.cartItemList.push(product);
    }
    this.productList.next(this.cartItemList);
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.forEach(item => {
      grandTotal += item.total;
    });
    return grandTotal;
  }

  removeCartItem(product: any) {
    const index = this.cartItemList.findIndex(item => item.id === product.id);
    if (index !== -1) {
      if (this.cartItemList[index].quantity > 1) {
        this.cartItemList[index].quantity--;
        this.cartItemList[index].total = this.cartItemList[index].quantity * this.cartItemList[index].price; // Update total
      } else {
        this.cartItemList.splice(index, 1);
      }
    }
    this.productList.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
