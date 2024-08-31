import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../Service/Project/project.service';
import { Sprint,SprintById } from '../../../Interface/Project';
import { Router,ActivatedRoute } from '@angular/router';
import { TaskById, TaskByIdData, taskData, TaskResponse } from '../../../Interface/Task';
import { TaskService } from '../../../Service/Task/task.service';
import { EmployeeProjectIDs } from '../../../Interface/Project';
import { MatSelectChange } from '@angular/material/select';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{
  public taskId!:number;
  public taskItemList: TaskById[] = []; 
  public projectMembers:EmployeeProjectIDs[]=[];
  public taskByIdResponse: TaskByIdData[]=[]; 
  public paramId!:number
  public pageInput: number = 1;
  public errorMsg: string = "";
  public maxPage: number = 1;
  public filterObj = {
  filterQuery: "",
  sortBy: "",
  isAscending: true,
  pageNumber: 0,
  pageSize: 0,
  status: [],
  type:[],
  assigned: true,
  assignedTo: null,
  projectId: 0,
  }
  public totalEntriesCount: number = 0;
  constructor(private projectService:ProjectService,
    private taskService:TaskService,
    private router:Router,
    private activatedroute:ActivatedRoute){}
ngOnInit(): void {
  this.getTaskById();
}
public getTaskById():void{
  this.activatedroute.paramMap.subscribe(data=>{
    const Id = Number(data.get("id"));
    console.log(Id) 
    this.filterObj.projectId = Id;
    this.getTaskDetails();
  })
}
public getTaskDetails(): void {
  this.taskService.getTaskById(this.filterObj).subscribe({
    next: (data) => {
      console.log("Task data",data.data);
      this.taskItemList=data.data;
      this.totalEntriesCount=data.totalEntriesCount;
      this.updateMaxPage();
    }
  });
}
public getParentData(): void {
  this.taskService.getTaskById(this.filterObj).subscribe({
    next: (data) => {
      console.log("Task data",data.data);
      this.taskItemList=data.data;
      this.totalEntriesCount=data.totalEntriesCount;
      this.updateMaxPage();
    }
  });
}
public TaskType(event: MatSelectChange): void {
  const taskType = event.value;
  this.filterObj.type = taskType;
}

public TaskAssigned(event: MatSelectChange): void{
  const assignedId = event.value;
  this.filterObj.assignedTo = assignedId;
  console.log(assignedId);
}
public TaskStatus(event: MatSelectChange): void {
  const status = event.value;
  console.log(status);
  this.filterObj.status = status;
}
public changePageSize(newSize: number): void {
  this.filterObj.pageSize = newSize;
  this.getTaskDetails();
}
public onSearch(): void {
  this.filterObj.filterQuery = this.filterObj.filterQuery.trim();
  this.filterObj.pageNumber = 1;
  this.getTaskDetails();
}
public onPageEvent(event: PageEvent): void {
  this.filterObj.pageSize = event.pageSize;
  this.filterObj.pageNumber = event.pageIndex + 1;
  this.getTaskDetails();
  console.log("pages", event)
}
public sortDep(sortBy: string): void {
  if (this.filterObj.sortBy === sortBy) {
    this.filterObj.isAscending = !this.filterObj.isAscending;
    this.getTaskDetails();
  } else {
    this.filterObj.sortBy = sortBy;
    this.filterObj.isAscending = true;

    this.getTaskDetails();
  }
}
getMaxPage(): number {
  return Math.ceil(this.totalEntriesCount / this.filterObj.pageSize);
  }
//jump on the particular page
public goToPage(): void {
  if (this.pageInput && this.pageInput > 0 && this.pageInput <= this.maxPage) {
    const event: PageEvent = {
      pageIndex: this.pageInput - 1,
      pageSize: this.filterObj.pageSize,
      length: this.totalEntriesCount
    };
    this.onPageEvent(event);
    // this.filterObj.pageNumber=this.pageInput
    this.getTaskDetails();
    this.errorMsg = ''
  } else {
    this.errorMsg = `page number ${this.pageInput} does not exist`
    this.pageInput = 1;
    
  }
}
private updateMaxPage(): void {
  this.maxPage = Math.ceil(this.totalEntriesCount / this.filterObj.pageSize);
}
//index no in continuous manner
public getGlobalIndex(index: number): number {
  return (this.filterObj.pageNumber - 1) * this.filterObj.pageSize + index + 1;
}
public clearSearch(): void {
  this.filterObj.filterQuery = ''; 
  this.pageInput = 1; 
  this.getTaskDetails();
}
}

