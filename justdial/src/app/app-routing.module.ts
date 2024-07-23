import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CaterersComponent } from './components/caterers/caterers.component';
import { BanquetDetailsComponent } from './components/banquet-details/banquet-details.component';

const routes: Routes = [
  {path:'',redirectTo:'dashboard',pathMatch:'full'},
  {path:'products', component:ProductsComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'caterers', component:CaterersComponent},
  {path:'banquet-details', component:BanquetDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
