import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ProductsModule { }
