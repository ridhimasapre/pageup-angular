import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { TodoSelectedComponent } from './todo-selected/todo-selected.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { RegisterdDataInfoComponent } from './registerd-data-info/registerd-data-info.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  {
    path:'todo',
    component:TodoComponent
  },

  {
    path:'todoselected/:id',
    component:TodoSelectedComponent
  },
  
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'registered-data-info',
    component:RegisterdDataInfoComponent
  },
  {
    path:'login',
    component:LoginComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent=[
  TodoComponent,
  TodoSelectedComponent,
  PageNotFoundComponent,
  LoginComponent
]
