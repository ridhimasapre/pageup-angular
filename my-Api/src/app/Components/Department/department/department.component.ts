import { Component, OnInit} from '@angular/core';
import { department, DepartmentPagenatorRequest, DepartmentPagenatorResponse, DepartmentRequest,departmentResponse } from '../../../Interface/Department';
import { DepartmentServiceService } from '../../../Service/department-service.service';
import { HttpClient } from '@angular/common/http';
import { DeleteServiceService } from '../../../Service/delete-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { HttpHeaders } from '@angular/common/http';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent implements OnInit{
  constructor(private departmentservice:DepartmentServiceService,private httpclient:HttpClient,private deleteservice:DeleteServiceService){}

  public departmentList:department[]=[];
  public departmentNotFound:string='';
  public searchQuery:string=''

  // filterObj ={
  //   'sortBy' : '',
  //   'isAscending': true,
  //   'pageNumber': 1,
  //   'pageSize': 10
  // }
  filterObj ={
    
  "pageIndex": 1,
  "pagedItemsCount": 3,
  "orderKey": "",
  "sortedOrder": 0,
  "search": ""
  }
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
          this.departmentList = res.data.data;
          if (this.departmentList.length === 0) {
            this.departmentNotFound = 'department is not found'; 
            alert(this.departmentNotFound); 
          } 
          console.log(res.data);
        }
      })
    }
    
   
    public changePageSize(newSize: number): void {
      this.filterObj.pagedItemsCount = newSize;
      // this.filterObj.pageIndex = 1; 
      this.getPagenation();
    }
    public onPrev():void{
      if (this.filterObj.pageIndex > 1) {
      this.filterObj.pagedItemsCount --;
      this.getPagenation();

    }
  }
    public onNext():void{
      this.filterObj.pageIndex++;
        this.getPagenation();
    }
    public onSearch(): void {
      this.filterObj.pageIndex = 1; //reset
      this.getPagenation();
  
     }
}