import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './Component/project-list/project-list.component';
import { ProjectAddComponent } from './Component/project-add/project-add.component';
import { ProjectViewComponent } from './Component/project-view/project-view.component';
import { TaskListComponent } from '../../Task/task/Component/task-list/task-list.component';

const routes: Routes = [
  {path:"project",component:ProjectListComponent},
  {path:"project/add",component:ProjectAddComponent},
  {path:"project/edit/:id",component:ProjectAddComponent},
  {path:"project/view/:id",component:ProjectViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
