import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee,EmployeePagenatorRequest,EmployeePagenatorResponse,EmployeeForm,EmployeeResponse,AddEmployeeRequest,AddEmployeeResponse} from '../../../Interface/Employee';
import { HttpClient } from '@angular/common/http';
import { DeleteServiceService } from '../../../Service/delete-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { MatPaginator,PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { EmployeeService } from '../../../Service/employee/employee.service';
import { DepartmentServiceService } from '../../../Service/department-service.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!:MatPaginator;
constructor(private employeeservice:EmployeeService,private httpclient:HttpClient,private deleteservice:DeleteServiceService){}
public employeeList:Employee[]=[];
public pageInput:number=1;
// public searchQuery:string='';
public employeeListLength!: number;
public employeeNotFound:string=''
// public filterEmployeeData:Employee[]=[];
// public ListLength=number;
public EmployeeFilterObj={
  
    filterOn: "",
    filterQuery: "",
    sortBy: "",
    isAscending: true,
    pageNumber: 1,
    pageSize: 10
  
}
public totalEntriesCount:number= 15;


ngOnInit(): void {
  this.getEmployeePagenation();
  // this. getemployee();
}
// public getemployee():void{
//   this.employeeservice.getEmployee().subscribe(data =>{
//     this.employeeList=data.data;
//     console.log(data);
//   });
// }
// public getemployee(): void{
//   this.employeeservice.getEmployee().subscribe({
//     next: (value: EmployeeResponse)=>{
//       console.log(value);
//       this.employeeList = value.data;
//       this.filterEmployeeData=this.employeeList;
//       this.employeeList;
//     },
//     error: (err: string)=>{
//       console.log(err);
//       alert("Error")
//     }
//   });
// }
public getEmployeePagenation():void{
  this.employeeservice.PagenationDepartment(this.EmployeeFilterObj).subscribe({
    next:(res:EmployeePagenatorResponse)=>{
      this.employeeList=res.data;
      this.paginator.length=this.totalEntriesCount;
      if (this.paginator) {
    this.paginator.length = this.totalEntriesCount;
  }
      if(this.employeeList.length === 0){
        this.employeeNotFound = 'department is not found'; 
        alert(this.employeeNotFound); 
        this.EmployeeFilterObj.filterQuery=''
        this.getEmployeePagenation();
      }
    }
  })
}
    public delete(id: number | null): void {
      this.deleteservice.openConfirmDialogEmployee('Are you sure to delete this Name?').afterClosed().subscribe(data => {
        if (data) {
          if (id !== null && id !== undefined) {
            this.employeeservice.deleteEmployee(id).subscribe(() => {
              console.log("deleted");
              this.totalEntriesCount--;
              this.getEmployeePagenation();
            });
          } else {
            console.error("Invalid ID");
          }
        }
      });
    }
    public changePageSize(newSize: number): void {
      this.EmployeeFilterObj.pageSize = newSize;
      this.getEmployeePagenation();
    }
    public onSearch(): void {
      this.EmployeeFilterObj.filterQuery = this.EmployeeFilterObj.filterQuery.trim();
      this.EmployeeFilterObj.pageNumber = 1;
      this.EmployeeFilterObj.pageSize = 10;
      this.getEmployeePagenation();
      console.log(this.EmployeeFilterObj)
     }
     public onPageEvent(event: PageEvent): void {
      this.EmployeeFilterObj.pageSize = event.pageSize;
      this.EmployeeFilterObj.pageNumber = event.pageIndex+1;
      this.getEmployeePagenation();
      console.log("pages",event);
    }
    public sortDep(sortBy: string): void {
      if (this.EmployeeFilterObj.sortBy === sortBy) {
        this.EmployeeFilterObj.isAscending = !this.EmployeeFilterObj.isAscending;
        this.getEmployeePagenation();
      } else {
        this.EmployeeFilterObj.sortBy = sortBy;
        this.EmployeeFilterObj.isAscending = true;
        
        this.getEmployeePagenation();
      }
    }
    public goToPage(): void {
      if (this.pageInput && this.pageInput > 0 && this.pageInput <= this.getMaxPage()) {
        const event: PageEvent = {
          pageIndex: this.pageInput - 1,
          pageSize: this.EmployeeFilterObj.pageSize,
          length: this.totalEntriesCount
        };
        this.onPageEvent(event);
        // this.filterObj.pageNumber=this.pageInput
        this.getEmployeePagenation();
      }
    }
    
    getMaxPage(): number {
      return Math.ceil(this.totalEntriesCount / this.EmployeeFilterObj.pageSize);
    }
    //index no in continuous manner
    public getGlobalIndex(index: number): number {
       return(this.EmployeeFilterObj.pageNumber - 1) * this.EmployeeFilterObj.pageSize + index + 1;
    }

}
