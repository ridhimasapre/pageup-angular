import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskServiceService } from '../../Service/task-service.service';
import { logResponse } from '../../model/task-model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
})
export class LogsComponent implements OnInit{
  public logId!:number;
  public logs!:logResponse
  public logList!:logResponse;
  public logobj={
    id:0,
    name:"",
    message:"",
    createdon:""
  }
  public id=0;
  constructor(private activatedroute:ActivatedRoute,
  private taskService:TaskServiceService,
  private dialogRef:MatDialogRef<LogsComponent>){
    this.activatedroute.params.subscribe((params)=>{
      const value =params;
      this.id=value['id'];
    })
  }
ngOnInit(): void {
  // this.getlog();
  // this.activatedroute.paramMap.subscribe((data) => {
  //   this.logId = Number(data.get("id"));
  //   if (this.logId) {
  //     this.getLogDetails(this.logId); 
  //   }
  // });
}
public getLogDetails(id: number): void {
  this.taskService.getLogs(id).subscribe({
    next: (data) => {
      console.log("log data", data);
      this.logs = data; 
    },
    error: (err) => console.error("Error fetching logs:", err)
  });
}

onCancel(): void {
  this.dialogRef.close();
}
}
