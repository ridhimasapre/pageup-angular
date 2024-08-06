import { Component, OnInit } from '@angular/core';
import { Employee,EmployeeForm,EmployeeResponse,AddEmployeeRequest,AddEmployeeResponse,GetEmployeeResponseById } from '../../../Interface/Employee';
import { HttpClient } from '@angular/common/http';
import { DeleteServiceService } from '../../../Service/delete-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
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
constructor(private employeeservice:EmployeeService,private httpclient:HttpClient,private deleteservice:DeleteServiceService){}
public employeeList:Employee[]=[];
public searchQuery:string='';
public employeeListLength!: number;
public filterEmployeeData:Employee[]=[];
// public ListLength=number;

ngOnInit(): void {
  this. getemployee();
}
public getemployee():void{
  this.employeeservice.getEmployee().subscribe(data =>{
    this.employeeList=data.data;
    console.log(data);
  });
}
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
    public delete(id: number | null): void {
      this.deleteservice.openConfirmDialog('Are you sure to delete this Name?').afterClosed().subscribe(data => {
        if (data) {
          if (id !== null && id !== undefined) {
            this.employeeservice.deleteEmployee(id).subscribe(() => {
              console.log("deleted");
              this.getemployee();
            });
          } else {
            console.error("Invalid ID");
          }
        }
      });
    }
    
    // public findemployee():void{
    //   if(this.searchQuery.trim()){
    //     this.filterEmployeeData=this.employeeList.filter(item => 
    //       item.name!.toLocaleLowerCase().includes(this.searchQuery.toLowerCase())
    //     )
    //   }else{
    //     this.filterEmployeeData=this.employeeList
    //   }
    // }


}
