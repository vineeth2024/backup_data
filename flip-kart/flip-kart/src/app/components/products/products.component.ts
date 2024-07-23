// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { ApiService } from 'src/app/service/api.service';
// import { CartService } from 'src/app/service/cart.service';

// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css']
// })
// export class ProductsComponent implements OnInit {
//   images: string[] = [
//     "../assets/smp5.webp",
//     "../assets/smp.webp",
//     "../assets/smp1.webp",
//     "../assets/smp2.webp",
//     "../assets/smp3.webp",
//     "../assets/smp4.webp",
//     "../assets/smp6.webp",
//     "../assets/smp7.webp",
    
//   ];
//   categories: any[] = [];
//   currentIndex: number = 0;
//   productList: any[] = [];
//   filterCategory: any[] = [];
//   searchKey: string = "";
//   showDropdown: boolean = false;
//   selectedCategory: any;
//   subcategories: any[] = []; 
//   showSubDropdown: boolean = false;
//   selectedSubcategory: any;

//   constructor(private api: ApiService, private router: Router, private cartService: CartService) { }

//   ngOnInit() {
//     this.loadProducts();
//     this.loadCategories();
//     this.cartService.search.subscribe((val: any) => {
//       this.searchKey = val;
//     });
//     setInterval(() => {
//       this.nextImage();
//     }, 3000); // Change image every 3 seconds
//   }

//   loadProducts() {
//     this.api.getProduct().subscribe(res => {
//       this.productList = res;
//       this.filterCategory = res;
//       this.productList.forEach((a: any) => {
//         if (a.category === "women's clothing" || a.category === "men's clothing") {
//           a.category = "fashion";
//         }
//         Object.assign(a, { quantity: 1, total: a.price });
//       });
//       console.log(this.productList);
//     });
//   }

//   loadCategories() {
//     this.api.getCategories().subscribe(
//       (categories: any[]) => {
//         this.categories = categories;
//       },
//       (error: any) => {
//         console.error('Error fetching categories:', error);
//       }
//     );
//   }

//   // Function to show subcategories dropdown
//   showSubcategories(event: MouseEvent, category: any) {
//     this.showDropdown = true;
//     this.selectedCategory = category;
//     this.subcategories = category.subcategories;
//   }

//   // Function to hide subcategories dropdown
//   hideSubcategories() {
//     this.showDropdown = false;
//     this.selectedCategory = null;
  
//   }

  
//   showSubsubcategories(event: MouseEvent, subcategory: any) {
//     this.showSubDropdown = true;
//     this.selectedSubcategory = subcategory;
//   }

//   hideSubsubcategories() {
//     this.showSubDropdown = false;
//     this.selectedSubcategory = null;
//   }

  
//   // Function to filter products based on category
//   filter(category: string) {
//     const selectedCategory = category.toLowerCase();
//     this.filterCategory = this.productList.filter((product: any) => {
//       const productCategory = product.category.toLowerCase();
//       return productCategory === selectedCategory;
//     });
//   }

//   // Function to handle subcategory selection
//   // selectSubcategory(subcategory: any) {
//   //   console.log('Selected subcategory:', subcategory);
//   // }

//   selectSubcategory(subcategory: any) {
//     this.api.getSubcategoriesById(subcategory.id).subscribe(
//       (response: any) => {
//         this.filterCategory = response.products; // Assuming 'products' is the key containing product array
//       },
//       (error: any) => {
//         console.error('Error fetching products by subcategory:', error);
//       }
//     );
//   }
  


//   nextImage() {
//     this.currentIndex = (this.currentIndex + 1) % this.images.length;
//   }

//   addtocart(item: any) {
//     this.cartService.addtoCart(item);
//   }

//   logCategory(category: string) {
//     console.log('Clicked category:', category);
//   }

//   showProductDetails(product: any) {
//     this.router.navigate(['/products', product.id]);
//   }

//   getConvertedPrice(price: number): number {
//     // Assuming exchange rate from USD to INR is 1 USD = 75 INR
//     return Math.floor(price * 75);
//   }

//   previousSlide() {
//     this.currentIndex = (this.currentIndex === 0) ? (this.images.length - 1) : (this.currentIndex - 1);
//   }

//   nextSlide() {
//     this.currentIndex = (this.currentIndex === this.images.length - 1) ? 0 : (this.currentIndex + 1);
//   }

//   goToSlide(index: number) {
//     this.currentIndex = index;
//   }
// }




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
  ];
  categories: any[] = [];
  currentIndex: number = 0;
  productList: any[] = [];
  filterCategory: any[] = [];
  searchKey: string = "";
  showDropdown: boolean = false;
  selectedCategory: any;
  subcategories: any[] = [];
  showSubDropdown: boolean = false;
  selectedSubcategory: any;

  constructor(private api: ApiService, private router: Router, private cartService: CartService) { }

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
    setInterval(() => {
      this.nextImage();
    }, 3000); // Change image every 3 seconds
  }

  loadProducts() {
    this.api.getProduct().subscribe(res => {
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a: any) => {
        if (a.category === "women's clothing" || a.category === "men's clothing") {
          a.category = "fashion";
        }
        Object.assign(a, { quantity: 1, total: a.price });
      });
      console.log(this.productList);
    });
  }

  loadCategories() {
    this.api.getCategories().subscribe(
      (categories: any[]) => {
        this.categories = categories;
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  // Function to show subcategories dropdown
  showSubcategories(event: MouseEvent, category: any) {
    this.showDropdown = true;
    this.selectedCategory = category;
    this.subcategories = category.subcategories;
  }

  // Function to hide subcategories dropdown
  hideSubcategories() {
    this.showDropdown = false;
    this.selectedCategory = null;
  }

  showSubsubcategories(event: MouseEvent, subcategory: any) {
    this.showSubDropdown = true;
    this.selectedSubcategory = subcategory;
  }

  hideSubsubcategories() {
    this.showSubDropdown = false;
    this.selectedSubcategory = null;
  }

  // Function to filter products based on category
  filter(category: string) {
    const selectedCategory = category.toLowerCase();
    this.filterCategory = this.productList.filter((product: any) => {
      const productCategory = product.category.toLowerCase();
      return productCategory === selectedCategory;
    });
  }

  // Function to handle subcategory selection
  selectSubcategory(subcategory: any) {
    this.api.getSubcategoriesById(subcategory.id).subscribe(
      (response: any) => {
        console.log('API response:', response); // Log the response to debug
        const products = response.subsubcategories.reduce((acc: any[], subsub: any) => {
          return acc.concat(subsub.products);
        }, []);
        this.filterCategory = products;
      },
      (error: any) => {
        console.error('Error fetching products by subcategory:', error);
      }
    );
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  addtocart(item: any) {
    this.cartService.addtoCart(item);
  }

  logCategory(category: string) {
    console.log('Clicked category:', category);
  }

  showProductDetails(product: any) {
    this.router.navigate(['/products', product.id]);
  }
  selectSubsubcategory(subsubcategory: any) {
    this.router.navigate(['/subsubcategory', subsubcategory.id]);
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






