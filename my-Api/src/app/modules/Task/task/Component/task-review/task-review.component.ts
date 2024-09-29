import { Component, OnInit } from '@angular/core';
import { Task } from 'ngx-ui-loader';
@Component({
  selector: 'app-task-review',
  templateUrl: './task-review.component.html',
  styleUrl: './task-review.component.css'
})
export class TaskReviewComponent implements OnInit{
 public task!:Task;
constructor(){}
ngOnInit(): void {
  
}
}
