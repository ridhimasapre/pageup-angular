import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './component/product/product.component';
import { CategoryComponent } from './component/category/category.component';
import { AddComponent } from './component/add/add.component';
import { EditProductComponent } from './component/edit-product/edit-product.component';
const routes: Routes = [
  { path: '', redirectTo: "category", pathMatch: "full"},
  { path: 'product', component: ProductComponent},
  {path:'product/edit',component:EditProductComponent},
  {path:'edit/:id',component:EditProductComponent},
  { path: 'category', component: CategoryComponent},
  {path: 'category/add',component: AddComponent},
  {path: 'add/:id',component: AddComponent},
  // {path: 'edit-category/:id',component:EditCategoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
