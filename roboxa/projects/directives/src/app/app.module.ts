import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgIfComponent } from './ng-if/ng-if.component';
import { FormsModule } from '@angular/forms';
import { NgForComponent } from './ng-for/ng-for.component';
import { NgforPropertiesComponent } from './ngfor-properties/ngfor-properties.component';


@NgModule({
  declarations: [
    AppComponent,
    NgIfComponent,
    NgForComponent,
    NgforPropertiesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [NgForComponent]
})
export class AppModule { }
