import { Component, input, OnInit, viewChild} from '@angular/core';
import { department, DepartmentPagenatorRequest, DepartmentPagenatorResponse, DepartmentRequest,departmentResponse } from '../../../Interface/Department';
import { DepartmentServiceService } from '../../../Service/department-service.service';
import { HttpClient } from '@angular/common/http';
import { DeleteServiceService } from '../../../Service/delete-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatSort,MatSortable } from '@angular/material/sort';
import { HttpHeaders } from '@angular/common/http';
import { AddComponent } from '../add/add.component';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
// import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent implements OnInit{
  // @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  constructor(private departmentservice:DepartmentServiceService,private httpclient:HttpClient,private deleteservice:DeleteServiceService){}

  public departmentList:department[]=[];
  public departmentNotFound:string='';
  public pageInput: number=1;
  public errorMsg:string='';
 
  // public updatedData:department={}
  // public searchQuery:string=''

  public filterObj ={
    filterOn:'',
    filterQuery:'',
    sortBy : '',
    isAscending: true,
    pageNumber: 1,
    pageSize: 10
  }
 public  totalEntriesCount:number=11;
  // filterObj ={
    
  // "pageIndex": 1,
  // "pagedItemsCount": 3,
  // "orderKey": "",
  // "sortedOrder": 0,
  // "search": ""
  // }
ngOnInit(): void {
  // this. getDepartments();
  this.getPagenation();
 
}

// public getdepart(): void{
//   this.departmentservice.getDepartmentList().subscribe({
//     next: (data: departmentResponse)=>{
//       console.log(data);
//       this.departmentList = data.data;
//     },
//     error: (err: string)=>{
//       console.log(err);
//       alert("Error")
//     }
//   })
// }


    public delete(id: number | null): void {
      this.deleteservice.openConfirmDialog('Are you sure to delete this Name?').afterClosed().subscribe(data => {
        if (data) {
          if (id !== null && id !== undefined) {
            this.departmentservice.deleteDepartment(id).subscribe(() => {
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
    public getPagenation():void{
   
      this.departmentservice.PaginationDepartment(this.filterObj).subscribe({
        next:(res:DepartmentPagenatorResponse)=>{
          this.departmentList = res.data;
          // this.totalEntriesCount=res.totalEntriesCount;
          this.paginator.length=this.totalEntriesCount;
            if (this.paginator) {
          this.paginator.length = this.totalEntriesCount;
        }
          if (this.departmentList.length === 0) {
            this.departmentNotFound = 'department is not found'; 
            alert(this.departmentNotFound); 
            this.filterObj.filterQuery=''
            this.getPagenation();
          } 
          console.log(res.data);
        }
      })
    }
    
   
    public changePageSize(newSize: number): void {
      this.filterObj.pageSize = newSize;
      this.getPagenation();
    }
    public onSearch(): void {
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
    this.errorMsg=`page number ${this.pageInput} does not exist`
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
}
