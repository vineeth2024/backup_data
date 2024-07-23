import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModelFormsComponent } from './model-forms/model-forms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TempFormValidationsComponent } from './temp-form-validations/temp-form-validations.component';
import { TemplateformBasicComponent } from './templateform-basic/templateform-basic.component';

@NgModule({
  declarations: [
    AppComponent,
    ModelFormsComponent,
    TempFormValidationsComponent,
    TemplateformBasicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [TempFormValidationsComponent ]
})
export class AppModule { }
