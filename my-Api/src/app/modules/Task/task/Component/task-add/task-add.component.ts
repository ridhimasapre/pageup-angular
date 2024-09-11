import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddTaskResponse } from '../../model/task-model';
import { TaskServiceService } from '../../Service/task-service.service';
@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.css'
})
export class TaskAddComponent {
  public addTaskData!:AddTaskResponse
  public TaskAdd: FormGroup<AddTaskResponse> = this.createForm();
  constructor(
    private dialogRef: MatDialogRef<TaskAddComponent>, private taskService:TaskServiceService) {}

public createForm():FormGroup<AddTaskResponse>{
  return new FormGroup<AddTaskResponse>({
    name:new FormControl(null,[Validators.required]),
    description:new FormControl(null,[Validators.required]),
    assignedToId:new FormControl(null),
    projectId:new FormControl(null),
    type:new FormControl(null,[Validators.required]),
    status:new FormControl(null,[Validators.required]),
    estimateHours:new FormControl(null,[Validators.required])
  })
}
  onCancel(): void {
    this.dialogRef.close();
  }
  taskList: any[] = [];  

// onSubmit(): void {
//   if (this.TaskAdd.valid) {
//     console.log("Task Added", this.TaskAdd.value);
//     this.taskList.push(this.TaskAdd.value);
//     this.dialogRef.close(this.TaskAdd.value);
//   }
// }
onSubmit(): void {
  console.log("task added fun");
  
  if (this.TaskAdd.valid) {
    console.log("Task Added", this.TaskAdd.value);
    this.taskService.addTask(this.addTaskData).subscribe({
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

