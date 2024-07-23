import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  productId: any;
  product: any;
  convertedPrice: number = 0;
  sizeChartVisible: boolean = false;
  mainImage: string = '';

  constructor(private route: ActivatedRoute,private router: Router, private api: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.api.getProductById(this.productId).subscribe((res: any) => {
        this.product = res;
        this.mainImage = this.product.image;  // Initialize main image
        this.convertPriceToINR();
      });
    });
  }

 
  addtocart(item: any){
    this.cartService.addtoCart(item);

  }
  convertPriceToINR() {
    // Assuming exchange rate from USD to INR is 1 USD = 75 INR
    this.convertedPrice = Math.floor(this.product.price * 75);
  }
  openSizeChart() {
    this.sizeChartVisible = true;
  }

  closeSizeChart() {
    this.sizeChartVisible = false;
  }
  // Method to change the main image
  changeMainImage(image: string) {
    this.mainImage = image;
  }
}
