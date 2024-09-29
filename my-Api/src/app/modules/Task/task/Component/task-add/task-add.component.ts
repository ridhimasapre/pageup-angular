import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddTaskResponse,TaskById } from '../../model/task-model';
import { TaskServiceService } from '../../Service/task-service.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectServiceService } from '../../../../Project/project/Service/project-service.service';
import { Project,ProjectResponse } from '../../../../Project/project/model/project-model';
import { TaskModule } from '../../task.module';
import { Task } from '../../model/task-model';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.css'
})
export class TaskAddComponent implements OnInit{
  public addTaskData: AddTaskResponse[]=[];
  public project! : Project;
  public projectId!:number;
  public taskId!:number;
  public task!:Task
  public taskItemList: TaskById[] = []; 
  public TaskAdd: FormGroup = this.createForm();
  constructor(
    private dialogRef: MatDialogRef<TaskAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
     private taskService:TaskServiceService,
     private activatedroute:ActivatedRoute,
    private projectService:ProjectServiceService) {}
ngOnInit(): void {
  this.getTaskById();
}
public getTaskById(): void {
  this.activatedroute.paramMap.subscribe(data => {
    this.taskId= Number(data.get("id"));
    console.log('Task id', this.taskId);
    if (this.taskId !== null) {
      this.projectId = this.taskId;
    }
  });
}
public createForm():FormGroup{
  return new FormGroup({
    name:new FormControl(null,[Validators.required]),
    description:new FormControl(null,[Validators.required]),
    assignedToId:new FormControl(null),
    projectId:new FormControl(this.projectId),
    type:new FormControl(null,[Validators.required]),
    status:new FormControl(null,[Validators.required]),
    estimateHours:new FormControl(null,[Validators.required])
  })
}
  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log("task added fun");

    if (this.TaskAdd.valid) {
      console.log("Task Added", this.TaskAdd.value);
      this.addTaskData = this.TaskAdd.value;

      // Ensure projectId is set
      if (this.projectId !== null) {
        this.TaskAdd.patchValue({ projectId: this.projectId });
      }
      
      this.taskService.addTask(this.TaskAdd.value).subscribe({
        next: (response) => {
          console.log('Task successfully added', response);
          this.dialogRef.close(this.TaskAdd.value);
        },
        error: (error) => {
          console.error('Error adding task', error);
        }
      });
    }
  }
}