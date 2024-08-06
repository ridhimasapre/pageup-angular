import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './component/product/product.component';
import { CategoryComponent } from './component/category/category.component';
import { AddComponent } from './component/add/add.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from './component/edit-product/edit-product.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CategoryComponent,
    AddComponent,
    EditProductComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
