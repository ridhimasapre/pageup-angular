import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee, EmployeePagenatorRequest, EmployeePagenatorResponse, EmployeeForm, EmployeeResponse, AddEmployeeRequest, AddEmployeeResponse } from '../../../Interface/Employee';
import { HttpClient } from '@angular/common/http';
import { DeleteServiceService } from '../../../Service/delete-service.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { EmployeeService } from '../../../Service/employee/employee.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public employeeList: Employee[] = [];
  public pageInput: number = 1;
  // public employeeListLength!: number;
  public errorMsg: string = '';
  public maxPage: number = 1;
  // public filterFields = ["name", "departmentName", "AdminName", "Role", "CreatedBy"];
  // public selectedFilterField: string = 'name';
  public selectedRole:string='';
  public superAdminCount: number = 0;
  public adminCount: number = 0;
  public employeeCount: number = 0;
  public EmployeeFilterObj = {
    filterOn: "",
    filterQuery: "",
    sortBy: "",
    isAscending: true,
    pageNumber: 1,
    pageSize: 10
  }
  public totalEntriesCount: number = 0;
  constructor(private employeeservice: EmployeeService,
    private httpclient: HttpClient, 
    private deleteservice: DeleteServiceService) { }

  ngOnInit(): void {
    this.getEmployeePagenation();
  }
  public getEmployeePagenation(): void {
    this.employeeservice.PaginationEmployee(this.EmployeeFilterObj).subscribe({
      next: (res: EmployeePagenatorResponse) => {
        this.employeeList = res.data;
        this.totalEntriesCount = res.totalEntriesCount;
        console.log("pagination count",res);
        this.updateMaxPage();
        this.calculateRoleCounts();
        if (this.paginator) {
          this.paginator.length = this.totalEntriesCount;
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
    this.getEmployeePagenation();
    console.log(this.EmployeeFilterObj)
  }

  public onPageEvent(event: PageEvent): void {
    this.EmployeeFilterObj.pageSize = event.pageSize;
    this.EmployeeFilterObj.pageNumber = event.pageIndex + 1;
    this.getEmployeePagenation();
    console.log("pages", event);
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
    if (this.pageInput && this.pageInput > 0 && this.pageInput <= this.maxPage) {
      const event: PageEvent = {
        pageIndex: this.pageInput - 1,
        pageSize: this.EmployeeFilterObj.pageSize,
        length: this.totalEntriesCount
      };
      this.onPageEvent(event);
      // this.filterObj.pageNumber=this.pageInput
      this.getEmployeePagenation();
      this.errorMsg = ''
    } else {
      this.errorMsg = `page number ${this.pageInput} does not exist`
      this.pageInput = 1;
      //  console.log("error is",)
    }
  }
  public updateMaxPage(): void {
    this.maxPage = Math.ceil(this.totalEntriesCount / this.EmployeeFilterObj.pageSize);
  }
  //index no in continuous manner
  public getGlobalIndex(index: number): number {
    return (this.EmployeeFilterObj.pageNumber - 1) * this.EmployeeFilterObj.pageSize + index + 1;
  }
  public clearSearch(): void {
    this.EmployeeFilterObj.filterQuery = ''; 
    this.pageInput = 1; 
    this.getEmployeePagenation();
  }
  public calculateRoleCounts(): void {
    this.superAdminCount = this.employeeList.filter(item => item.role === 2).length;
    this.adminCount = this.employeeList.filter(item => item.role === 1).length;
    this.employeeCount = this.employeeList.filter(item => item.role === 0).length;
  }
  // public calculateRoleCounts(): void {
  //   const filteredList = this.employeeList.filter((item) => {
  //     if (this.selectedRole === 'SuperAdmin') {
  //       return item.role === 2;
  //     } else if (this.selectedRole === 'Admin') {
  //       return item.role === 1;
  //     } else if (this.selectedRole === 'Employee') {
  //       return item.role === 0;
  //     } else {
  //       return true; 
  //     }
  //   });
  //   this.superAdminCount = filteredList.filter((item) => item.role === 2).length;
  //   this.adminCount = filteredList.filter((item) => item.role === 1).length;
  //   this.employeeCount = filteredList.filter((item) => item.role === 0).length;
  // }
   public filterByRole(role: string): void { 
    this.selectedRole = role; 
    this.EmployeeFilterObj.filterOn = 'role';
    this.EmployeeFilterObj.filterQuery = role;
    this.EmployeeFilterObj.pageNumber = 1; 
    this.getEmployeePagenation(); 
  }
}
