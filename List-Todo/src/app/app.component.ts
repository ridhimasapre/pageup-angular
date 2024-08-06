import { Component } from '@angular/core';
import { Todo } from './todo/todo';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'List-Todo';
  // todos:{text:string}[]=[];
  // newTodo:string='';
  // desTod:string='';
  // addTodo(){
  //   if(this.newTodo.trim()){
  //     this.todos.push({text:this.newTodo})
  //     this.newTodo='';
  //   }
  // }
}
