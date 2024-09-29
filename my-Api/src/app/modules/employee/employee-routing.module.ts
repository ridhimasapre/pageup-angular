import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './Component/employee-list/employee-list.component';
import { EmployeeAddComponent } from './Component/employee-add/employee-add.component';

const routes: Routes = [
  {path:"",component:EmployeeListComponent},
  {path:"employee/add",component:EmployeeAddComponent},
  {path:'employee/edit/:id',component:EmployeeAddComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
