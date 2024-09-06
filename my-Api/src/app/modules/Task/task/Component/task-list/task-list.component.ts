import { Component,OnInit } from '@angular/core';
import { Sprint,SprintById } from '../../../../Project/project/model/project-model';
import { ProjectServiceService } from '../../../../Project/project/Service/project-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { ChildById, ParentTaskRequest, ParentTaskResponse, TaskById, TaskByIdData, taskData, TaskResponse } from '../../model/task-model';
import { TaskServiceService } from '../../../task/Service/task-service.service';
import { EmployeeProjectIDs } from '../../../../Project/project/model/project-model';
import { MatSelectChange } from '@angular/material/select';
import { PageEvent } from '@angular/material/paginator';
import { TaskModule } from '../../task.module';
import { Employee,EmployeeDeleteResponse } from '../../../../employee/Model/employee-model';
import { EmployeeServiceService } from '../../../../employee/Service/employee-service.service';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{
  public taskId!:number;
  public taskParentId!:number;
  public taskItemList: TaskById[] = []; 
  public childItemList:ChildById[]=[]
  public projectMembers:EmployeeProjectIDs[]=[];
  public taskByIdResponse: TaskByIdData[]=[]; 
  public employeeList:Employee[]=[]
  public paramId!:number
  public parentid!:number
  public projectid!:number
  public pageInput: number = 1;
  public errorMsg: string = "";
  public maxPage: number = 1;
  public childShow:boolean=false;
  public filterObj = {
  filterQuery: "",
  sortBy: "",
  isAscending: true,
  pageNumber: 0,
  pageSize: 0,
  status: null,
  type: null,
  assigned: true,
  assignedTo: null,
  projectId: 0,
  } 
  public parentData={
    projectId:0,
    parentId:0,
  }
  public totalEntriesCount: number = 0;
  constructor(private projectService:ProjectServiceService,
    private taskService:TaskServiceService,private employeeservice:EmployeeServiceService,
    private router:Router,
    private activatedroute:ActivatedRoute){}
ngOnInit(): void {
  this.getTaskById();
}
public getTaskById():void{
  this.activatedroute.paramMap.subscribe(data=>{
    this.taskId = Number(data.get("id"));
    console.log("project id",this.taskId) 
    this.filterObj.projectId = this.taskId;
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
// public getChild(id:number):void{
//   console.log("id",id)
//   this.taskParentId=id;
//   this.activatedroute.paramMap.subscribe(data=>{
//     console.log("task parent id is", data.get("id"))
//     this.taskParentId = Number(data.get("id"));
//     console.log("task id for",this.taskParentId) 
//     this.parentData.parentId=this.taskParentId;
//     this.parentData.projectId=this.taskId
//     this.ChildById();
//   })
// }
// public ChildById(): void {
//   this.taskService.getTaskByParent(this.parentData).subscribe({
//     next: (data) => {
//       this.childItemList = data.data;
//       this.childShow=true;
//       console.log("List of child tasks", data.data);
//     },
//     error: (err) => {
//       console.error("Error", err);
//     }
//   });
// }
public getChild(id: number): void {
  console.log("Parent task ID:", id);

  this.taskParentId = id;
  this.parentData.parentId = this.taskParentId;
  this.parentData.projectId = this.taskId;

  console.log(" Parent ID in payload:", this.parentData.parentId);
  console.log(" Project ID in payload:", this.parentData.projectId);

  this.taskService.getTaskByParent(this.parentData).subscribe({
    next: (data) => {
      this.childItemList = data.data;
      this.childShow = true;
      console.log("List of child tasks", data.data);
    },
    error: (err) => {
      console.error("Error", err);
    }
  });
}

public getEmployeeList(id: number){
  console.log("id of project", id);
  this.employeeservice.getEmployee().subscribe({
    next:(data)=>{
      const Data = data.data;
      this.employeeList = Data;
      console.log(this.employeeList);
      console.log(data);
      console.log(Data);
    },
    error: (err)=>{
      console.log(err);
    }
  })
}
public TaskType(event: MatSelectChange): void {
  const taskType = event.value;
  this.filterObj.type = taskType;
  this.getTaskDetails()
}
public TaskAssigned(event: MatSelectChange): void{
  const assignedId = event.value;
  this.filterObj.assignedTo = assignedId;
  this.getEmployeeList(this.paramId);
  console.log("assigned to",assignedId);
}
public TaskStatus(event: MatSelectChange): void {
  const status = event.value;
  console.log("status of task",status);
  this.filterObj.status = status;
  this.getTaskDetails()
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
