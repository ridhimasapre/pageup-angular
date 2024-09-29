import { Component,OnInit } from '@angular/core';
import { Sprint,SprintById } from '../../../../Project/project/model/project-model';
import { ProjectServiceService } from '../../../../Project/project/Service/project-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { ChildById, ParentTaskRequest, ParentTaskResponse,AddTaskResponse, TaskById, TaskByIdData, taskData, TaskResponse ,TaskAddRequest, TaskReview} from '../../model/task-model';
import { TaskServiceService } from '../../../task/Service/task-service.service';
import { EmployeeProjectIDs } from '../../../../Project/project/model/project-model';
import { MatSelectChange } from '@angular/material/select';
import { PageEvent } from '@angular/material/paginator';
import { TaskModule } from '../../task.module';
import { Employee,EmployeeDeleteResponse } from '../../../../employee/Model/employee-model';
import { EmployeeServiceService } from '../../../../employee/Service/employee-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Input } from '@angular/core';
import { DeleteServiceService } from '../../../../SharedModules/shared/services/delete-service.service';
import { AddTaskReviewComponent } from '../add-task-review/add-task-review.component';
import { Project } from '../../../../Project/project/model/project-model';
import { TaskAddComponent } from '../task-add/task-add.component';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{
  public taskId!:number;
  public project! : Project
  public taskParentId!:number;
  public projectId!:number;
  @Input()  taskItemList: TaskById[] = []; 
  @Input() parentTaskId: number | null = null;
  public childItemList:ChildById[]=[]
  public projectMembers:EmployeeProjectIDs[]=[];
  public taskByIdResponse: TaskByIdData[]=[]; 
  public employeeList:Employee[]=[];
  public childTasks?: ChildById[];
  public ProjectList : Project[]=[]; 
  public addTaskData:AddTaskResponse[]=[];
  public sprintList:Sprint[]=[];
  public taskReview!:TaskReview
  public sprintSelected: boolean = false;
  public disableSubmitBtn: boolean = true;
  public selectedType!:number;
  public assiged:boolean=false;
  public paramId!:number;
  public parentid!:number;
  public projectid!:number;
  public pageInput: number = 1;
  public errorMsg: string = "";
  public maxPage: number = 1;
  public childShow=false;
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
  public SprintObj = {
  assign: null,
  assignedTo: null,
  dateRange: null,
  // orderKey: "id",
  pageIndex: 1,
  pagedItemsCount: 10,
  // search: "",
  // sortedOrder: 0,
  sprintId: null,
  status: null,
  types: null,
  };
  public totalEntriesCount: number = 0;

  constructor(private projectService:ProjectServiceService,
    private taskService:TaskServiceService,private employeeservice:EmployeeServiceService,
    private router:Router,
    private activatedroute:ActivatedRoute,
    private dialog:MatDialog,
  ){}

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
public toggleChild(taskId: number): void {
  const task = this.taskItemList.find(t => t.id === taskId);
  if (task) {
    task.childShow = !task.childShow;
    if (task.childShow) {
      this.getChild(taskId); 
    }
  }
}

public getChild(parentTaskId: number): void {
  console.log("Fetching child tasks for Parent task ID:", parentTaskId);
  this.parentData.parentId = parentTaskId;
  this.parentData.projectId = this.taskId;
  this.taskService.getTaskByParent(this.parentData).subscribe({
    next: (data) => {
      const task = this.taskItemList.find(t => t.id === parentTaskId);
      if (task) {
        this.childItemList = data.data;
        // task.childTasks = data.data; 
        this.childTasks=data.data
        task.childShow = true; 
      }
      console.log("List of child tasks", data.data);
    },
    error: (err) => {
      console.error("Error fetching child tasks", err);
    }
  });
}

// public getEmployeeList(id: number){
//   console.log("id of project", id);
//   this.projectService.getProjectById(id).subscribe({
//     next:(data)=>{
//       // const list = data.data.projectEmployee;
//       this.employeeList = data.data;
//       this.project=data.data
//       console.log("employee list",this.employeeList);
//       console.log(data);
//     },
//     error: (err)=>{
//       console.log(err);
//     }
//   })
// }
public TaskType(event: MatSelectChange): void {
  const taskType = event.value;
  this.filterObj.type = taskType;
  this.getTaskDetails()
}

public TaskAssigned(event: MatSelectChange): void{
  const assignedId = event.value;
  console.log("assigned to",assignedId);
  this.filterObj.assignedTo = assignedId;
  this.filterObj.assigned =this.assiged
  // this.ProjectList(this.projectid);
  console.log("assigned to",assignedId);
}

public onChangeAssign(event: MatSelectChange): void{
  const assignvalue = event.value;
  console.log("assign value",assignvalue);
  this.TaskAssigned = assignvalue;
  this.getTaskDetails();
  this.assiged = event.value !== null;
}

public TaskStatus(event: MatSelectChange): void {
  const status = event.value;
  console.log("status of task",status);
  this.filterObj.status = status;
  this.getTaskDetails()
}

public onSprintChange(event: MatSelectChange){
  const sprint = event.value;
  this.SprintObj.sprintId = sprint;
  console.log(this.SprintObj);
  console.log("changes");
  this.sprintSelected = event.value !== 0;
}

public SubmitChanges(){
  if(this.disableSubmitBtn == false){
  this.SprintObj.pageIndex = 1;
  this.SprintObj.pagedItemsCount = 10;
  this.totalEntriesCount = 10;
  }
}

public getSprintListOfProject(id: number): void{
  this.projectService.getSprintById(id).subscribe({
   next: (data)=>{
     console.log("sprint",data);
     const Data = data.data;
     this.sprintList = Data;
     console.log(Data);
   },
   error: (err)=>{
     console.log(err);
   }
  })
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

// get type of task in list 
public getTaskTypeLabel(taskType: number): string {
  switch (taskType) {
    case 0:
      return "Epic";
    case 1:
      return "Feature";
    case 2:
      return "Userstory";
    case 3:
      return "Task";
    case 4:
      return "Bug";
    default:
      return 'Unknown';
  }
}

public openAddTaskModal(): void {
  const dialogRef = this.dialog.open(TaskAddComponent,{
    data: {projectId :this.projectId},
});

  dialogRef.afterClosed().subscribe((result: AddTaskResponse | null) => {
    if (result) {
      this.taskService.addTask(result).subscribe({
        next:()=>{
          console.log("data is coming");
          this.addTask(result)  
        }
      })
    }
  });
}

public addTask(taskData: AddTaskResponse): void {
  this.addTaskData.push({
    name:taskData.name,
    type: taskData.type ,
    assignedToId:taskData.assignedToId,
    description: taskData.description,
    status:taskData.status,
    projectId:taskData.projectId,
    estimateHours:taskData.estimateHours,
  });
}

public deleteTask(taskId: number): void {
  if (confirm('Are you sure you want to delete this task?')) {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.getTaskDetails();
      },
      error: (err) => {
        console.error('Error deleting task', err);
      }
    });
  }
}
}

