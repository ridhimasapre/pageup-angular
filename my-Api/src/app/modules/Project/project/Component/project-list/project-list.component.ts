import { Component,OnInit } from '@angular/core';
import { ProjectServiceService } from '../../Service/project-service.service';
import { HttpClient } from '@angular/common/http';
import { Project,ProjectResponse, ProjectStatus,EmployeeProjectIDs} from '../../model/project-model';
import { EmployeeServiceService } from '../../../../employee/Service/employee-service.service';
import { PageEvent,MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { ProjectModule } from '../../project.module';
import { TaskListComponent } from '../../../../Task/task/Component/task-list/task-list.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  public ProjectList:Project[]=[];
  public EmployeeMembers:EmployeeProjectIDs[]=[]; 
  public pageInput: number=1;
  public errorMsg:string='';
  public selectedStatus:string="";
  public createdCount: number = 0;
  public runningCount: number = 0;
  public completedCount: number = 0;
  public search:string="";
  public projectId!:number;
  public filterObj ={
    filterOn:"",
    filterQuery:"",
    sortBy :"",
    isAscending: true,
    pageNumber: 1,
    pageSize: 10,
    additionalSearch:"",
  }
  public  totalEntriesCount:number=0;
  public displayedEntriesCount: number = 0; 
  public statusEntriesCount:boolean=false;
  constructor(private projectService:ProjectServiceService,
  private EmployeeService:EmployeeServiceService,
  private httpClient:HttpClient){}
ngOnInit(): void {
  this.getPagenation();
  this.calculateStatusCounts();
}
public getPagenation():void{
   
  this.projectService.PaginationProject(this.filterObj).subscribe({
    next:(res:ProjectResponse<Project[]>)=>{
      this.ProjectList=res.data;
      console.log("my data is",this.ProjectList);
      this.totalEntriesCount=res.totalEntriesCount
        if (this.paginator) {
      this.paginator.length = this.totalEntriesCount;
    }
      console.log("the data of patch value is",res.data);
    }
  })
}
public getStatusCount(status: ProjectStatus): void {
  this.projectService.getStatusCount(status).subscribe({
    next: (data: ProjectResponse<number>) => {        
      if (status === ProjectStatus.created) {
        this.createdCount = data.data;
      } else if (status === ProjectStatus.running) {
        this.runningCount = data.data;
      } else if (status === ProjectStatus.completed) {
        this.completedCount = data.data;
      }
    }
  });
}
public calculateStatusCounts(): void {
  this.getStatusCount(ProjectStatus.created);
  this.getStatusCount(ProjectStatus.running);
  this.getStatusCount(ProjectStatus.completed);
}
public changePageSize(newSize: number): void {
  this.filterObj.pageSize = newSize;
  this.getPagenation();
}
public onSearch(): void {
  if (this.statusEntriesCount == true) {
    this.filterObj.filterOn = "status";      
    this.filterObj.filterQuery = this.selectedStatus;      
    this.filterObj.additionalSearch = this.search.trim();      
  } else {
    // search all fields
    this.filterObj.filterOn = ""; 
  // this.filterObj.filterQuery = this.filterObj.filterQuery.trim();
  this.filterObj.additionalSearch=this.search.trim();
  }
  // this.filterObj.additionalSearch = "";
  this.filterObj.pageNumber = 1;
  this.getPagenation();
}
 public onPageEvent(event: PageEvent): void {
  this.filterObj.pageSize = event.pageSize;
  this.filterObj.pageNumber = event.pageIndex+1;
  this.getPagenation();
  console.log("pages",event)
}

public sortDep(sortBy: string): void {
if (this.filterObj.sortBy === sortBy) {
this.filterObj.isAscending = !this.filterObj.isAscending;
this.getPagenation();
} else {
this.filterObj.sortBy = sortBy;
this.filterObj.isAscending = true;

this.getPagenation();
}
}
//jump on the particular page
public goToPage(): void {
const maxPage=this.getMaxPage()
if (this.pageInput && this.pageInput > 0 && this.pageInput <= this.getMaxPage()) {
const event: PageEvent = {
  pageIndex: this.pageInput - 1,
  pageSize: this.filterObj.pageSize,
  length: this.totalEntriesCount
};
this.onPageEvent(event);
// this.filterObj.pageNumber=this.pageInput
this.getPagenation();
this.errorMsg=''
}else{
this.errorMsg=`page number ${this.pageInput} does not exist`;
this.pageInput=1;
// this.errorMsg='';
}
}
getMaxPage(): number {
return Math.ceil(this.totalEntriesCount / this.filterObj.pageSize);
}
//index no in continuous manner
public getGlobalIndex(index: number): number {
return(this.filterObj.pageNumber - 1) * this.filterObj.pageSize + index + 1;
}
public clearSearch(): void {
  this.search = "";
  this.filterObj.additionalSearch = "";
  this.pageInput = 1;
  if (this.statusEntriesCount) {
    this.filterObj.filterQuery = "";
  } else {
    this.filterObj.filterOn = ""; 
    this.filterObj.filterQuery = "";
  }
  this.getPagenation();
}
public filterBystatus(status: string): void { 
  this.selectedStatus = status; 
  this.filterObj.filterOn = "status";
  this.filterObj.filterQuery = status;
  this.statusEntriesCount=true;
  this.filterObj.pageNumber = 1; 
  this.getPagenation(); 
}
public removeMember(memberId: number, projectId: number): void {
  console.log("data is deleted", memberId, projectId);
  this.projectService.removeProjectMember(projectId, memberId).subscribe({
    next: () => {
      this.EmployeeMembers = this.EmployeeMembers.filter(
        (member) => member.id !== memberId        
      );
    },
    error: (err) => {
      this.errorMsg = 'Failed to remove the member.';
      console.error(err);
    }
  });
}
}
