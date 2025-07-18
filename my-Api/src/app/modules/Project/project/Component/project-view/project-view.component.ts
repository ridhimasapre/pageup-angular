import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectServiceService } from '../../Service/project-service.service';
import { Project, ProjectStatus } from '../../model/project-model';
import { Employee } from '../../../../employee/Model/employee-model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProjectModule } from '../../project.module';
import { TaskModule } from '../../../../Task/task/task.module';
import { TaskListComponent } from '../../../../Task/task/Component/task-list/task-list.component';
import { items, TaskById, taskData } from '../../../../Task/task/model/task-model';
import { TaskServiceService } from '../../../../Task/task/Service/task-service.service';
import { MatSelectChange } from '@angular/material/select';
@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.css'
})
export class ProjectViewComponent implements OnInit {
  public projectId!: number;
  public ProjectList: Project[] = [];
  public taskList: TaskById[] = [];
  public taskItemList: TaskById[] = []; 
  public employeeList: Employee[] = []
  public projectStatus = ProjectStatus;
  public project!: Project
  public errorMsg: string = "";
  public selectedStatus: string = "";
  public loginId: null | number = null;
  public isEmployee:boolean=false;
  public totalEntriesCount: number = 0;
  public epicTaskList:items[]=[]
  public maxPage: number = 1;
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
    startDate:null,
    endDate:null,
    sprintId:null
    } 
    public childObj ={
      id:null,
      name:"",
      type:null,
      createdOn:""

    }
  constructor(private projectService: ProjectServiceService,
    private taskService:TaskServiceService,
    private router: Router, private activatedroute: ActivatedRoute) { }
  ngOnInit(): void {
    this.getProjectId();    
    // this. getTaskDetails()
    if (localStorage.getItem('role') === '0') this.isEmployee = true;
    this.loginId = Number(localStorage.getItem('id'));
  }
  
  public getProjectId(): void {
    this.activatedroute.paramMap.subscribe(data => {
      this.projectId = Number(data.get("id"));
      console.log(this.projectId)
      this.getProjectDetails(this.projectId);
    })
  }
  public getProjectDetails(id: number): void {
    this.projectService.getProjectById(id).subscribe({
      next: (data) => {
        console.log("view data", data);
        this.project = data.data;
      }
    });
  }
  public removeMember(i: number): void {
    this.ProjectList.splice(i, 1);
  }
  
  getStatus(status: ProjectStatus) {
    if (status === ProjectStatus.created) {
      return "Created";
    } else if (status === ProjectStatus.running) {
      return "Running";
    } else if (status === ProjectStatus.completed) {
      return "Completed";
    } else {
      return "Unknown Status please Check First"
    }
  }
  // task 
  public getTaskDetails(): void {
    this.taskService.getTaskById(this.childObj).subscribe({
      next: (data) => {
        console.log("Task data",data.data);
        this.taskItemList=data.data;
        this.totalEntriesCount=data.totalEntriesCount;
        this.updateMaxPage();
      }
    });
  }
  
  public taskchidData():void{
    this.getTaskDetails()
  }
  public TaskType(event: MatSelectChange): void {
    const taskType = event.value;
    this.filterObj.type = taskType;
    this.getTaskDetails()
  }
  public TaskStatus(event: MatSelectChange): void {
    const status = event.value;
    console.log("status of task", status);
    this.filterObj.status = status;
    this.getTaskDetails()
  }
  public TaskAssigned(event: MatSelectChange): void {
    const assignedId = event.value;
    console.log("assigned to", assignedId);
    this.filterObj.assignedTo = assignedId;
    // this.filterObj.assigned = this.assiged
    // this.ProjectList(this.projectid);
    console.log("assigned to", assignedId);
  }
  public onChangeAssign(event: MatSelectChange): void {
    const assignvalue = event.value;
    console.log("assign value", assignvalue);
    this.TaskAssigned = assignvalue;
    this.getTaskDetails();
    // this. assigned = event.value !== null;
  }
  private updateMaxPage(): void {
    this.maxPage = Math.ceil(this.totalEntriesCount / this.filterObj.pageSize);
  }
}
