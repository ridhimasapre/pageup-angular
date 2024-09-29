import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './modules/user-auth/user-auth/service/auth.service';
import { LoginComponent } from './modules/user-auth/user-auth/login/login.component';
import { roleguardGuard } from './modules/user-auth/user-auth/RoleGuard/roleguard.guard';
const routes: Routes = [
  {
    path: "login",
    loadChildren: () => import("./modules/user-auth/user-auth/user-auth.module").then(mod => mod.UserAuthModule)
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import("./modules/user-auth/user-auth/user-auth.module").then(m => m.UserAuthModule) },
  {
    path: "department",
    loadChildren: () => import("./modules/Department/department-module/department-module.module").then(mod => mod.DepartmentModuleModule),
    canActivate: [roleguardGuard]
  },

  {
    path: "employee",
    loadChildren: () => import("./modules/employee/employee.module").then(mod => mod.EmployeeModule),
    canActivate: [roleguardGuard]
  },

  {
    path: "project",
    loadChildren: () => import("./modules/Project/project/project.module").then(mod => mod.ProjectModule),
    canActivate: [roleguardGuard]
  },

  {
    path: "task",
    loadChildren: () => import("./modules/Task/task/task.module").then(mod => mod.TaskModule),
    canActivate: [roleguardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
