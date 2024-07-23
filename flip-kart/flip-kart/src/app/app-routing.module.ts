import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component'; // Import product details component
import { LoginComponent } from './login/login.component';
import { SubsubcategoriesproductsComponent } from './subsubcategoriesproducts/subsubcategoriesproducts.component';

const routes: Routes = [
  {path:'',redirectTo:'products',pathMatch:'full'},
  {path:'products', component:ProductsComponent},
  {path:'cart', component:CartComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'subsubcategory/:id', component: SubsubcategoriesproductsComponent}
  // {path:'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
