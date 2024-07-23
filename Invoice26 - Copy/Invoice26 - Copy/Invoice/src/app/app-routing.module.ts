import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CustomersComponent } from './customers/customers.component';
import { HeaderComponent } from './header/header.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AddproductsComponent } from './addproducts/addproducts.component';
import { InvoiceaddComponent } from './invoiceadd/invoiceadd.component';
import { ProductsGridComponent } from './products-grid/products-grid.component';
import { AccountInwardComponent } from './account-inward/account-inward.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { UserGridComponent } from './user-grid/user-grid.component';
import { InvoiceGridComponent } from './invoice-grid/invoice-grid.component';
import { CustomerGridComponent } from './customer-grid/customer-grid.component';
import { AccountGridComponent } from './account-grid/account-grid.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminProfileGridComponent } from './admin-profile-grid/admin-profile-grid.component';
import { LoginComponent } from './login/login.component';
import { NavigationbarComponent } from './navigationbar/navigationbar.component';
import { AccountIComponent } from './account-i/account-i.component';
import { AGridComponent } from './a-grid/a-grid.component';
import { ViewpdfComponent } from './viewpdf/viewpdf.component';

const routes: Routes = [
  {path:'',redirectTo:'login', pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'side',component:HeaderComponent},
  {path:'side',component:SidenavComponent},
  {path:'customers/:id',component: CustomersComponent },
  {path:'customers',component:CustomersComponent},
  {path: 'user',component: AdduserComponent },
  {path:'user/:id',component:AdduserComponent},
  {path: 'product',component: AddproductsComponent },
  {path:'product/:id',component:AddproductsComponent},
  {path: 'invoice',component: InvoiceaddComponent },
  {path:'product-grid',component:ProductsGridComponent},
  {path:'add_inward',component:AccountInwardComponent},
  {path:'add_inward/:id',component:AccountInwardComponent},
  {path:'dashboard',component:DashboardHomeComponent},
  {path:'user-grid',component:UserGridComponent},
  {path:'invoice-grid',component:InvoiceGridComponent},
  {path:'customer-grid',component:CustomerGridComponent},
  {path:'account-grid',component:AccountGridComponent},
  {path:'admin-profile',component:AdminProfileComponent},
  {path:'admin-grid',component:AdminProfileGridComponent},
  {path:'nav',component:NavigationbarComponent    },
  {path:'in',component:AccountIComponent},
  {path:'a-grid',component:AGridComponent},
  {path:'view',component:ViewpdfComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
