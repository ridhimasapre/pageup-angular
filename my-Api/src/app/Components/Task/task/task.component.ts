import { Component ,OnInit, ViewChild} from '@angular/core';
import { TaskService } from '../../../Service/Task/task.service';
import { HttpClient } from '@angular/common/http';
import { Task,TaskResponse,PagenatorRequest } from '../../../Interface/Task';
import { PageEvent,MatPaginator } from '@angular/material/paginator';
import { DeleteServiceService } from '../../../Service/delete-service.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit{
  public TaskList:Task[]=[];
  public pageInput: number=1;
  public errorMsg:string='';
  public maxPage: number = 1;
  // public filterFields = ['name', 'createdBy','status'];
  // public selectedFilterField: string = 'name'; 
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
  constructor(private taskService:TaskService,
    private httpClient:HttpClient,
    private deleteservice:DeleteServiceService){}

ngOnInit(): void {
  this.getPagenation();
}
public getPagenation():void{
   
  this.taskService.PaginationTask(this.filterObj).subscribe({
    next:(res:TaskResponse<Task[]>)=>{
      // this.ProjectList;
      this.TaskList=res.data;
      // console.log("my data is",this.TaskList);
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
public delete(id: number | null): void {
  this.deleteservice.openConfirmDialogEmployee('Are you sure to delete this Name?').afterClosed().subscribe(data => {
    if (data) {
      if (id !== null && id !== undefined) {
        this.taskService.deleteTask(id).subscribe(() => {
          console.log("deleted");
          this.totalEntriesCount--;
          this.getPagenation();
        });
      } else {
        console.error("Invalid ID");
      }
    }
  });
}
public changePageSize(newSize: number): void {
  this.filterObj.pageSize = newSize;
  this.getPagenation();
}
public onSearch(): void {
  // this.filterObj.filterOn = this.selectedFilterField;
  this.filterObj.filterQuery = this.filterObj.filterQuery.trim();
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
// public goToPage(): void {
// const maxPage=this.getMaxPage()
// if (this.pageInput && this.pageInput > 0 && this.pageInput <= this.getMaxPage()) {
// const event: PageEvent = {
//   pageIndex: this.pageInput - 1,
//   pageSize: this.filterObj.pageSize,
//   length: this.totalEntriesCount
// };
// this.onPageEvent(event);
// this.getPagenation();
// this.errorMsg=''
// }else{
// this.errorMsg=`page number ${this.pageInput} does not exist`;
// this.pageInput=1;
// }
// }
getMaxPage(): number {
return Math.ceil(this.totalEntriesCount / this.filterObj.pageSize);
}
//index no in continuous manner
public getGlobalIndex(index: number): number {
return(this.filterObj.pageNumber - 1) * this.filterObj.pageSize + index + 1;
}
public changePage(newPage: number): void {
  if (newPage >= 1 && newPage <= this.maxPage) {
    this.filterObj.pageNumber = newPage;
    // this.getTasks();  // Method to get the tasks based on the current page
  }
}

public goToPageFromDropdown(pageNumber: number): void {
  this.pageInput = pageNumber;
  this.goToPage();
}

public goToPage(): void {
  if (this.pageInput && this.pageInput > 0 && this.pageInput <= this.maxPage) {
    this.changePage(this.pageInput);
    this.errorMsg = "";
  } else {
    this.errorMsg = `Page number ${this.pageInput} does not exist`;
    this.pageInput = 1;
  }
}

public previousPage(): void {
  if (this.filterObj.pageNumber > 1) {
    this.changePage(this.filterObj.pageNumber - 1);
  }
}

public nextPage(): void {
  if (this.filterObj.pageNumber < this.maxPage) {
    this.changePage(this.filterObj.pageNumber + 1);
  }
}

}
