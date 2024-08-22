import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee, EmployeePagenatorRequest, EmployeePagenatorResponse, EmployeeForm, EmployeeResponse, AddEmployeeRequest, AddEmployeeResponse,RoleCountResponse,EmployeeRole } from '../../../Interface/Employee';
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
  public errorMsg: string = '';
  public maxPage: number = 1;
  public selectedRole:string="";
  public superAdminCount: number = 0;
  public adminCount: number = 0;
  public employeeCount: number = 0;
  public search:string="";
  public EmployeeFilterObj = {
    filterOn: "",
    filterQuery: "",
    sortBy: "",
    isAscending: true,
    pageNumber: 1,
    pageSize: 10,
    additionalSearch:"",
  }
  public totalEntriesCount: number = 0;
  public rolesentriesCount:boolean=false;
  constructor(private employeeservice: EmployeeService,
    private httpclient: HttpClient, 
    private deleteservice: DeleteServiceService) { }
  ngOnInit(): void {
    this.getEmployeePagenation();
    this.calculateRoleCounts()
  }
  // console.log(this.EmployeeFilterObj);
  public getEmployeePagenation(): void {
    // console.log(this.EmployeeFilterObj);
    this.employeeservice.PaginationEmployee(this.EmployeeFilterObj).subscribe({
      next: (res: EmployeePagenatorResponse) => {
        this.employeeList = res.data;
        this.totalEntriesCount = res.totalEntriesCount;
        console.log("pagination count",res);
        this.updateMaxPage();
        if (this.paginator) {
          this.paginator.length = this.totalEntriesCount;
        }
      }
    })
  }
  public getRoleCount(role: EmployeeRole): void {
    this.employeeservice.getRoleCount(role).subscribe({
      next: (data: RoleCountResponse) => {        
        if (role === EmployeeRole.SuperAdmin) {
          this.superAdminCount = data.data;
        } else if (role === EmployeeRole.Admin) {
          this.adminCount = data.data;
        } else if (role === EmployeeRole.Employee) {
          this.employeeCount = data.data;
        }
      }
    });
  }
  public calculateRoleCounts(): void {
    this.getRoleCount(EmployeeRole.SuperAdmin);
    this.getRoleCount(EmployeeRole.Admin);
    this.getRoleCount(EmployeeRole.Employee);
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
    // this.EmployeeFilterObj.filterQuery = this.EmployeeFilterObj.filterQuery.trim();
    if (this.rolesentriesCount == true) {
      // If a role filter is active, search the role      
      this.EmployeeFilterObj.filterOn = "role";      
      this.EmployeeFilterObj.filterQuery = this.selectedRole;      
      this.EmployeeFilterObj.additionalSearch = this.search;      
    } else {
      // Otherwise, search all fields
      this.EmployeeFilterObj.filterOn = ""; 
    this.EmployeeFilterObj.filterQuery = this.EmployeeFilterObj.filterQuery.trim();
    }
    // this.EmployeeFilterObj.additionalSearch = "";
    this.EmployeeFilterObj.pageNumber = 1;
    this.getEmployeePagenation();
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
      this.getEmployeePagenation();
      this.errorMsg = ""
    } else {
      this.errorMsg = `page number ${this.pageInput} does not exist`
      this.pageInput = 1;
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
    this.EmployeeFilterObj.filterQuery =""; 
    // this.EmployeeFilterObj.additionalSearch="";
    this.search=""
    // this.selectedRole="" 
    // this.rolesentriesCount = false; 
    this.pageInput = 1; 
    this.getEmployeePagenation();
  }
   public filterByRole(role: string): void { 
    this.selectedRole = role; 
    this.EmployeeFilterObj.filterOn = "role";
    this.EmployeeFilterObj.filterQuery = role;
    this.rolesentriesCount=true;
    // if(this.rolesentriesCount === true){
    //   this.EmployeeFilterObj.filterQuery=this.selectedRole 
    // this.EmployeeFilterObj.additionalSearch = "";
    // }
    this.EmployeeFilterObj.pageNumber = 1; 
    this.getEmployeePagenation(); 
  }
}

