import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public totalItem : number = 0;
  public searchTerm : string = '';
  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(res=>{
      this.totalItem = res.length;

    })
    $('#loginModal').modal('handleUpdate');
  }
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }
  openLoginModal() {
    $('#loginModal').modal('show');
  }

}
