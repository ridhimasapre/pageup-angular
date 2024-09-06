import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskViewComponent } from './Component/task-view/task-view.component';
import { TaskListComponent } from './Component/task-list/task-list.component';

const routes: Routes = [
  {path:"view/:id",component:TaskViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
