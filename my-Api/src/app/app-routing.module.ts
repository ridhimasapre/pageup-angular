import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './Components/Department/department/department.component';
import { AddComponent } from './Components/Department/add/add.component';
import { EmployeeComponent } from './Components/Employee/employee/employee.component';
import { AddEmployeeComponent } from './Components/Employee/add-employee/add-employee.component';
import { ProjectComponent } from './Components/Project/project/project.component';
import { AddProjectComponent } from './Components/Project/add-project/add-project.component';
import { AppComponent } from './app.component';
import { TaskComponent } from './Components/Task/task/task.component';
import { AddTaskComponent } from './Components/Task/add-task/add-task.component';
import { ViewProjectComponent } from './Components/Project/view-project/view-project.component';
const routes: Routes = [
  {path:'',component:DepartmentComponent},
  {path:'department' ,component:DepartmentComponent},
  {path:'department/add',component:AddComponent},
  {path:'update/:id',component:AddComponent},
  {path:'employee',component:EmployeeComponent},
  {path:'employee/add',component:AddEmployeeComponent},
  {path:'employee/edit/:id',component:AddEmployeeComponent},
  {path:'project',component:ProjectComponent},
  {path:'project/add',component:AddProjectComponent},
  {path:'project/edit/:id',component:AddProjectComponent},
  {path:'project/view/:id',component:ViewProjectComponent},
  {path:'task',component:TaskComponent},
  {path:"task/add",component:AddTaskComponent},
  {path:'task/edit/:id',component:AddTaskComponent},
  // {path:"departmnet", loadChildren:()=>import('./department/department-module.module')}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
