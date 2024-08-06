import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { Route, Router } from '@angular/router';
import { TodoItem } from './todo-itme.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {
  todo:TodoItem[]=[
    {id:1,name:"Html"},
    {id:2,name:"Css"},
    {id:3,name:"Js"},
    {id:3,name:"Angular"},
  ]
  constructor(private router: Router){}
  ngOnInit(): void {
    {}
  }
onSelect(todo:{id: number}){
this.router.navigate(['/todoselected',todo.id])
}

// todoItems: TodoItem[] = [
//   { id: 1, title: 'Item 1', completed: false },
//   { id: 2, title: 'Item 2', completed: false },
//   { id: 3, title: 'Item 3', completed: false }
// ];
// markasCompleted(item: TodoItem): void {
//   item.completed = !item.completed;
// }
}
