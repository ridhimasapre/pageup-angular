import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './Components/Department/department/department.component';
import { AddComponent } from './Components/Department/add/add.component';
import { EmployeeComponent } from './Components/Employee/employee/employee.component';
import { AddEmployeeComponent } from './Components/Employee/add-employee/add-employee.component';

const routes: Routes = [
  {path:'',component:DepartmentComponent},
  {path:'department' ,component:DepartmentComponent},
  {path:'department/add',component:AddComponent},
  {path:'employee',component:EmployeeComponent},
  {path:'employee/add',component:AddEmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
