import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DepartmentlistComponent } from '../../Department/department-module/Components/departmentlist/departmentlist.component';
import { ProjectListComponent } from '../../Project/project/Component/project-list/project-list.component';
import { EmployeeListComponent } from '../../employee/Component/employee-list/employee-list.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"departmentlist",component:DepartmentlistComponent},
  {path:"projectlist",component:ProjectListComponent},
  {path:"employeelist",component:EmployeeListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAuthRoutingModule { }
