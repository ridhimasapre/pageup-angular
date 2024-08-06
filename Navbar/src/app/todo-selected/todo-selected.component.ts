import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-todo-selected',
  templateUrl: './todo-selected.component.html',
  styleUrl: './todo-selected.component.css'
})
export class TodoSelectedComponent implements OnInit{
   todoid:any;
   todoname:any;
 
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    
    // let name = this.route.snapshot.paramMap.get('name');
  this.todoid=id;
  console.log(this.todoid)
    // this.todoname=name;
    // console.log(this.todoname)
  }
  
}
