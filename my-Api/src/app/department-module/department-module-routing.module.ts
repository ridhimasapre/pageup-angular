import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentSecComponent } from './department-sec/department-sec.component';
import { DepartmentAddComponent } from './department-add/department-add.component';
const routes: Routes = [
  {path:"department",component:DepartmentSecComponent},
  {path:'department/add',component:DepartmentAddComponent},
  {path:'update/:id',component:DepartmentAddComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentModuleRoutingModule { }
