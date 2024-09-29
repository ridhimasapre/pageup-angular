import { Component, OnInit } from '@angular/core';
import { taskData,Task,Status,Type, TaskReview, ReviewForm} from '../../model/task-model';
import { TaskServiceService } from '../../Service/task-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectServiceService } from '../../../../Project/project/Service/project-service.service';
import { TaskModule } from '../../task.module';
import { Validators } from '@angular/forms';
import { FormGroup,FormControl } from '@angular/forms';
import { AddTaskReviewComponent } from '../add-task-review/add-task-review.component';
import { MatDialog } from '@angular/material/dialog';
import { LogsComponent } from '../logs/logs.component';
@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css'
})
export class TaskViewComponent implements OnInit{
 public task!:Task;
 public tasklist:Task[]=[]
 public taskid!:number;
 public taskStatus=Status;
 public taskType=Type;
 public projectId:number | null=null;
 public Review!:TaskReview;
 public TaskReviewList:TaskReview[]=[];
 public ReviewForm: FormGroup<ReviewForm> = this.createForm();
public ReviewObj={
  comments:"",
  reviewerName:"",
  dataTime:"",
}
 constructor(public taskservice:TaskServiceService,
  private router:Router,
  private activatedRoute:ActivatedRoute,
  private dialog:MatDialog
 ){}

ngOnInit(): void {
  this.getTaskDetail();
  this.getTaskById(this.taskid)
}
public getTaskDetail():void{
  this.activatedRoute.paramMap.subscribe(data=>{
    this.taskid=Number(data.get("id"));
    console.log("task id",this.taskid);
    this.getTaskById(this.taskid);
    this.getTaskReview(this.taskid);
  })
}
// public getTaskById(id:number): void {
//   this.taskservice.getProjectById(id).subscribe({
//     next: (data) => {
//       console.log("view data",data);
//       this.task=data.data;
//     }
//     });
//   }
public getTaskById(id: number): void {
  this.taskservice.getProjectById(id).subscribe({
    next: (response) => {
      console.log("Task data:", response);
      this.task = response.data;  
    },
    error: (err) => {
      console.error("Error fetching task:", err);
    }
  });
}
public getTaskReview(id:number):void{
  this.taskservice.getTaskReview(id).subscribe({
    next:(response)=>{
      // console.log("review id",id);      
      console.log("review data",response);
      this.Review = response.data;
      console.log(response.data);
    },
    error: (err) => {
      console.error("Error", err);
    }
  })
}
public createForm() {
  return new FormGroup<ReviewForm>({
    id: new FormControl(null, [Validators.required]),
    reviewerName: new FormControl(null, [Validators.required]),
    comments: new FormControl(null, [Validators.required]),
    dataTime: new FormControl(null, [Validators.required]),
  });
}
public deleteTask(taskId: number): void {
  if (confirm('Are you sure you want to delete this task?')) {
    this.taskservice.deleteTaskReview(taskId).subscribe({
      next: () => {
        this.getTaskDetail();
      },
      error: (err) => {
        console.error('Error deleting task', err);
      }
    });
  }
}
public getStatus(status:Status){
  if (status === Status.pending) {
    return "pending";
  } else if (status === Status.active) {
    return "active";
  } else if(status === Status.Completed) {
    return "Completed";
  }else{
    return "Unknown Status please Check First"
  }
}
public getType(type:Type){
  if (type === Type.epic) {
    return "epic";
  } else if (type === Type.feature) {
    return "feature";
  } else if(type === Type.userstory) {
    return "userstory";
  }else if(type === Type.task) {
    return "task";
  }else if(type === Type.bug) {
    return "bug";
  }else{
    return "Unknown Status"
  }
}
public openAddTaskReviewModal() :void{
  const dialogRef = this.dialog.open(AddTaskReviewComponent, {
    width: '400px',
  });

  dialogRef.afterClosed().subscribe((result: TaskReview) => {
    if (result) {
      this.addTaskReview(result);
    }
  });
}

public addTaskReview(review: TaskReview):void{
  this.taskservice.addTaskReview(review).subscribe(response => {
      if (response.success) {
        console.log('Task review added successfully');
      } else {
        console.error('Failed to add task review', response.message);
      }
    });
}
public openLogModal(): void {
  const logRef = this.dialog.open(LogsComponent, {
    width: '400px',
  });

  logRef.afterClosed().subscribe((result) => {
    console.log('Modal closed', result);
  });
}
}
