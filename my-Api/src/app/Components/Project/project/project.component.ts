import { Component,OnInit } from '@angular/core';
import { ProjectService } from '../../../Service/Project/project.service';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from '../../../Service/employee/employee.service';
import { Project,ProjectResponse} from '../../../Interface/Project';
import { PageEvent,MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit{
constructor(private projectService:ProjectService,private EmployeeService:EmployeeService,private httpClient:HttpClient){}
public ProjectList:Project[]=[]; 
public pageInput: number=1;
  public errorMsg:string='';
  public filterFields = ['name', 'createdBy','status'];
public selectedFilterField: string = 'name'; 
@ViewChild(MatPaginator) paginator!:MatPaginator;
public filterObj ={
  filterOn:'',
  filterQuery:'',
  sortBy : '',
  isAscending: true,
  pageNumber: 1,
  pageSize: 10
}
public  totalEntriesCount:number=15;
ngOnInit(): void {
  this.getPagenation();

}
// public getProject():void{
//   this.projectService.GetProject().subscribe((data=>{
//     this.ProjectList=data.data;
//     console.log("data dedo na",data);
    
//   }))
//  } 
public getPagenation():void{
   
  this.projectService.PaginationProject(this.filterObj).subscribe({
    next:(res:ProjectResponse<Project[]>)=>{
      // this.ProjectList;
      this.ProjectList=res.data;
      console.log("my data is",this.ProjectList);
      this.paginator.length=this.totalEntriesCount;
        if (this.paginator) {
      this.paginator.length = this.totalEntriesCount;
    }
      // if (this.ProjectList.length === 0) {
      //   alert('department is not found'); 
      //   this.filterObj.filterQuery=''
      //   this.getPagenation();
      // } 
      console.log("the data of patch value is",res.data);
    }
  })
}

public changePageSize(newSize: number): void {
  this.filterObj.pageSize = newSize;
  this.getPagenation();
}
public onSearch(): void {
  this.filterObj.filterOn = this.selectedFilterField;
  this.filterObj.filterQuery = this.filterObj.filterQuery.trim();
  this.filterObj.pageNumber = 1;
  // this.filterObj.pageSize = 10;
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
  this.filterObj.filterQuery = ''; 
  this.pageInput = 1; 
  this.getPagenation();
}
}


