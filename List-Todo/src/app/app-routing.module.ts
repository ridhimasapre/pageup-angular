import { input, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { TodoselectedComponent } from './todoselected/todoselected.component';

const routes: Routes = [
  
  {
    path:"todo",
    component:TodoComponent,
  },
  {
    path:"todoselected",
    component:TodoselectedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//router -> routerlink,passing parameters,navigate,activated route  
// input output 
