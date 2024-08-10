import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './Components/Department/department/department.component';
import { AddComponent } from './Components/Department/add/add.component';
import { EmployeeComponent } from './Components/Employee/employee/employee.component';
import { AddEmployeeComponent } from './Components/Employee/add-employee/add-employee.component';
import { ProjectComponent } from './Components/Project/project/project.component';
// import { DeleteComponent } from './Components/Employee/Delete/delete/employeedelete.component';

const routes: Routes = [
  {path:'',component:DepartmentComponent},
  {path:'department' ,component:DepartmentComponent},
  {path:'department/add',component:AddComponent},
  {path:'add/:id',component:AddComponent},
  {path:'employee',component:EmployeeComponent},
  {path:'employee/add',component:AddEmployeeComponent},
  {path:'employee/edit/:id',component:AddEmployeeComponent},
  {path:'project',component:ProjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
