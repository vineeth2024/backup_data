import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CustomersComponent } from './customers/customers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { InvoiceaddComponent } from './invoiceadd/invoiceadd.component';
import { AddproductsComponent } from './addproducts/addproducts.component';
import { AdduserComponent } from './adduser/adduser.component';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProductsGridComponent } from './products-grid/products-grid.component';
import { AccountInwardComponent } from './account-inward/account-inward.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { RippleModule } from 'primeng/ripple';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { InvoiceGridComponent } from './invoice-grid/invoice-grid.component';
import { AccountGridComponent } from './account-grid/account-grid.component';
import { UserGridComponent } from './user-grid/user-grid.component';
import { CustomerGridComponent } from './customer-grid/customer-grid.component';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { KeyFilterModule } from 'primeng/keyfilter';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminProfileGridComponent } from './admin-profile-grid/admin-profile-grid.component';
import { LoginComponent } from './login/login.component';
import { NavigationbarComponent } from './navigationbar/navigationbar.component';
import { AccountIComponent } from './account-i/account-i.component';
import { AGridComponent } from './a-grid/a-grid.component';
import { ViewpdfComponent } from './viewpdf/viewpdf.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { DialogModule } from 'primeng/dialog'; // Import the DialogModule
import { InvoiceService } from './invoice-grid/invoice.service';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    CustomersComponent,
    HeaderComponent,
    InvoiceaddComponent,
    AddproductsComponent,
    AdduserComponent,
    ProductsGridComponent,
    AccountInwardComponent,
    DashboardHomeComponent,
    InvoiceGridComponent,
    AccountGridComponent,
    UserGridComponent,
    CustomerGridComponent,
    AdminProfileComponent,
    AdminProfileGridComponent,
    LoginComponent,
    NavigationbarComponent,
    AccountIComponent,
    AGridComponent,
    ViewpdfComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    BrowserAnimationsModule,
    InputTextModule,
    CardModule,
    HttpClientModule,
    ToastModule,
    RippleModule,
    BreadcrumbModule,
    TableModule,
    SidebarModule,
    PanelMenuModule,
    KeyFilterModule,
    NgxPaginationModule,
    DialogModule
  ],
  providers: [MessageService,ConfirmationService,InvoiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
