import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductsComponent } from './components/products/products.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CaterersComponent } from './components/caterers/caterers.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { BanquetDetailsComponent } from './components/banquet-details/banquet-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    DashboardComponent,
    CaterersComponent,
    ProductDetailsComponent,
    BanquetDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
