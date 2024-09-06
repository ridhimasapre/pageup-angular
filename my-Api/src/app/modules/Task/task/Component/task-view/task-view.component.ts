import { Component, OnInit } from '@angular/core';
import { taskData } from '../../model/task-model';
import { TaskServiceService } from '../../Service/task-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css'
})
export class TaskViewComponent implements OnInit{
 public task!:taskData;
 public taskid!:number;
 public parentData={
  projectId:0,
  parentId:0,
}
 constructor(public taskservice:TaskServiceService,
  private router:Router,
  private activatedRoute:ActivatedRoute
 ){}
ngOnInit(): void {
  this.getTaskDetail();
}
public getTaskDetail():void{
  this.activatedRoute.paramMap.subscribe(data=>{
    this.taskid=Number(data.get("id"));
    // this.getTaskById(this.taskid);
  })
}
// public getTaskById(id:number): void {
//   this.taskservice.getTaskById(this.parentData).subscribe({
//     next: (data) => {
//       console.log("view data",data);
//       this.task=data.data;
//     }
//     });
//   }
}
