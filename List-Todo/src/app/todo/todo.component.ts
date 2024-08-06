import { Component } from '@angular/core';
import { Todo } from './todo';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  todo:Todo[]=[
    // new Todo(1,'complete dsa','By Code Help ',false),
    // new Todo(2,'complete react','By Code with Herry',false)
  ];
  // constructor(){
  //   console.log(this.todo)
  // }
  newtodoData={
    id:0,
    title:'',
    desciption:'',
    checked:false
  }
  public add(): void{
    const newTodo2=new Todo(
      this.newtodoData.id,
      this.newtodoData.title,
      this.newtodoData.desciption,
      this.newtodoData.checked
    )
    this.todo.push(newTodo2)
    this.newtodoData={id:0,title:'',desciption:'',checked:false}
  }
  public deleteAll(){
    this.todo=this.todo.filter((e)=>e.checked!=true)
  }
  public checked(index:number){
    const todo=this.todo.find(a=>a.getId() === index)
      if(todo){
        // todo.toggleChecked();
        console.log(todo);
      } 
  }
  public selectAll(): void {
    console.log("selected");
    this.todo.forEach((todo, index) => {
      todo.setChecked(true);
      todo.setId(index + 1);
      console.log(todo);
    });
}
}