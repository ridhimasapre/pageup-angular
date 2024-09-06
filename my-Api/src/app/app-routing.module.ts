import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {path:"login",
   loadChildren:()=>import("./modules/user-auth/user-auth/user-auth.module").then(mod=>mod.UserAuthModule)},

  {path:"department",
  loadChildren:()=>import("./modules/Department/department-module/department-module.module").then(mod=>mod.DepartmentModuleModule)},
  // {path:"employee",
  //   loadChildren:()=>import("./modules/employee/employee.module").then(mod=>mod.EmployeeModule)
  // },
  {path:"employee",
    loadChildren:()=>import("./modules/employee/employee.module").then(mod=>mod.EmployeeModule)
  },
  {
    path:"project",
    loadChildren:()=>import("./modules/Project/project/project-routing.module").then(mod=>mod.ProjectRoutingModule)
  },
  {path:"task",
    loadChildren:()=>import("./modules/Task/task/task-routing.module").then(mod=>mod.TaskRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
