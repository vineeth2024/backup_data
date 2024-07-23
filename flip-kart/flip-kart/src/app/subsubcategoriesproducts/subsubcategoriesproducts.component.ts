import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-subsubcategoriesproducts',
  templateUrl: './subsubcategoriesproducts.component.html',
  styleUrls: ['./subsubcategoriesproducts.component.css']
})
export class SubsubcategoriesproductsComponent implements OnInit {

  subsubcategoryId: number = 0; // Initialize with a default value
  products: any[] = [];
  mainImages: { [key: number]: string } = {}; // Store main images for each product


  constructor(private route: ActivatedRoute, private api: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.subsubcategoryId = +id; // Ensure the id is a number
        this.loadProducts();
      }
    });
  }

  loadProducts(): void {
    this.api.getSubsubcategoriesById(this.subsubcategoryId).subscribe(
      (response: any) => {
        this.products = response.products;
         // Initialize mainImages with the main product images
         this.products.forEach(product => {
          this.mainImages[product.id] = product.image;
        });
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  addtocart(item: any){
    this.cartService.addtoCart(item);

  }

  getConvertedPrice(price: number): number {
    // Assuming exchange rate from USD to INR is 1 USD = 75 INR
    return Math.floor(price * 75);
  }
  // Method to change the main image for a product
  changeMainImage(productId: number, image: string) {
    this.mainImages[productId] = image;
  }

}
