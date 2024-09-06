import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DepartmentlistComponent } from '../../Department/department-module/Components/departmentlist/departmentlist.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"departmentlist",component:DepartmentlistComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAuthRoutingModule { }
