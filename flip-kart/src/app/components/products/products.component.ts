import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  images: string[] = [
    "../assets/smp5.webp",
    "../assets/smp.webp",
    "../assets/smp1.webp",
    "../assets/smp2.webp",
    "../assets/smp3.webp",
    "../assets/smp4.webp",
    "../assets/smp6.webp",
    "../assets/smp7.webp",
    // Add more image paths as needed
  ];
  currentIndex: number = 0;
  public productList : any;
  public filterCategory : any;
  searchKey:string ="";
  showDropdown: boolean = false;
  constructor(private api : ApiService,private router: Router, private cartService: CartService){}

  ngOnInit(){
    this.api.getProduct().subscribe(res=>{
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a:any)=>{
        if(a.category ==="women's clothing" || a.category ==="men's clothing"){
          a.category ="fashion"
        }
        Object.assign(a,{quantity:1,total:a.price});
     });
     console.log(this.productList)
    });
    this.cartService.search.subscribe((val: any)=>{
      this.searchKey = val;
    })
    setInterval(() => {
      this.nextImage();
    }, 3000); // Change image every 3 seconds
  }
  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
  
  addtocart(item: any){
    this.cartService.addtoCart(item);
  }
  filter(category:string){
    this.filterCategory = this.productList.filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }
    })
  }
  showProductDetails(product: any) {
    this.router.navigate(['/product', product.id]);
  }
  getConvertedPrice(price: number): number {
    // Assuming exchange rate from USD to INR is 1 USD = 75 INR
    return Math.floor(price * 75);
  }
  previousSlide() {
    this.currentIndex = (this.currentIndex === 0) ? (this.images.length - 1) : (this.currentIndex - 1);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex === this.images.length - 1) ? 0 : (this.currentIndex + 1);
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }
}
