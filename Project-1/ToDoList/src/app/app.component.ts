import { style } from '@angular/animations';
import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ToDoList';
  list:any[]=[];
  todo:string=''
  toggle=true;
  addTask(data:string)
  {
  this.list.push({id:this.list.length,name:data});
  // console.log(this.list);
  console.log(data)
  }

  removeTodo(id:number,data:string){

    this.list=this.list.filter(data=>data.id!==id)
    console.log("removed task",id,data)
  }
  done(id:number){
    console.log("done task",id)
  this.toggle=!this.toggle;
  }



  newTodo: string = '';   //initalize newTodo=empty.it holds text of newtodo(input)
  todos: { text: string }[] = [];  //initize array of object whre obj me text jo string hai curr value
  doneTodos: { text: string }[] = [];  //compled task ke array hai 

  addTodo() {
    if (this.newTodo.trim()) { //newtodo !=empty after trim space
      this.todos.push({ text: this.newTodo }); //to todoslist me add ho jaye ga
      this.newTodo = ''; //input=newtodo=empty
    }
    
  }

  deleteTodo(index: number) { //remove item from todoslist
    this.todos.splice(index, 1);   //splice(start,kitne delete krne h,if want add)
  }

  Done(index: number) {
    const doneTodo = this.todos.splice(index, 1)[0];  //[0]add to the array /first element of array
    this.doneTodos.push(doneTodo); //add donetodo  
  }
  movebackTodo(index: number) {
    const todo = this.doneTodos.splice(index, 1)[0];
    this.todos.push(todo);
  }
}


