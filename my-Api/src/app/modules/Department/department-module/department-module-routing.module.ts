import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentlistComponent } from './Components/departmentlist/departmentlist.component';
const routes: Routes = [
  {path:"",component:DepartmentlistComponent},
  {path:"department",component:DepartmentlistComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentModuleRoutingModule { }
