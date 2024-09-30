import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee, EmployeePagenatorResponse, RoleCountResponse, EmployeeRole, EmployeeResponseById } from '../../Model/employee-model';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DeleteServiceService } from '../../../SharedModules/shared/services/delete-service.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeServiceService } from '../../Service/employee-service.service';
import { Project, projectEmployeeitem, EmployeeProjectIDs } from '../../../Project/project/model/project-model';
import { ProjectModule } from '../../../Project/project/project.module';
import { AuthService } from '../../../user-auth/user-auth/service/auth.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public employeeList: Employee[] = [];
  public SelectedEmployeeList: Employee[] = [];
  public isActive = false;
  public isupdated = false;
  public memberList: projectEmployeeitem[] = [];
  public projectMembers: EmployeeProjectIDs[] = [];
  public pageInput: number = 1;
  public errorMsg: string = '';
  public maxPage: number = 1;
  public selectedRole: string = "";
  public superAdminCount: number = 0;
  public adminCount: number = 0;
  public employeeCount: number = 0;
  public dialogref: MatDialogRef<any> | undefined;
  public search: string = "";
  public dataFlag!: boolean;
  public isModalOpen: boolean = false;
  public isSelect: boolean = false;
  public EmployeeFilterObj = {
    filterOn: "",
    filterQuery: "",
    sortBy: "",
    isAscending: true,
    pageNumber: 1,
    pageSize: 10,
    additionalSearch: "",
    // startDate:"",
    // endDate:""
  }
  public totalEntriesCount: number = 0;
  public displayedEntriesCount: number = 0;
  public rolesentriesCount: boolean = false;

  constructor(private employeeservice: EmployeeServiceService,
    private httpclient: HttpClient,
    private dialog: MatDialog,
    private authService: AuthService,
    // private ref:MatDialogRef<EmployeeComponent>,
    private deleteservice: DeleteServiceService) { }
  ngOnInit(): void {
    this.getEmployeePagenation();
    this.calculateRoleCounts()
  }
  public isEmployee(): boolean {
    return this.authService.isEmployee();
  }
  public getEmployeePagenation(): void {
    this.employeeservice.PaginationEmployee(this.EmployeeFilterObj).subscribe({
      next: (res: EmployeePagenatorResponse) => {
        this.employeeList = res.data;
        this.totalEntriesCount = res.totalEntriesCount;
        if (this.rolesentriesCount) {
          if (this.selectedRole === 'SuperAdmin') {
            this.displayedEntriesCount = this.superAdminCount;
          } else if (this.selectedRole === 'Admin') {
            this.displayedEntriesCount = this.adminCount;
          } else if (this.selectedRole === 'Employee') {
            this.displayedEntriesCount = this.employeeCount;
          }
        } else {
          this.displayedEntriesCount = this.totalEntriesCount;
        }
        console.log("pagination count", res);
        this.updateMaxPage();
        if (this.paginator) {
          // this.paginator.length = this.totalEntriesCount;
          this.paginator.length = this.displayedEntriesCount;
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
    this.deleteservice.openConfirmDialog('Are you sure to delete this Employee?').afterClosed().subscribe(data => {
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
    if (this.rolesentriesCount == true) {
      this.EmployeeFilterObj.filterOn = "role";
      this.EmployeeFilterObj.filterQuery = this.selectedRole;
      this.EmployeeFilterObj.additionalSearch = this.search.trim();
    } else {
      // Otherwise, search all fields
      this.EmployeeFilterObj.filterOn = "";
      // this.EmployeeFilterObj.filterQuery = this.search;
      this.EmployeeFilterObj.additionalSearch = this.search.trim();
      // this.EmployeeFilterObj.pageNumber = 1;
      // this.getEmployeePagenation();
    }
    this.EmployeeFilterObj.pageNumber = 1;
    this.getEmployeePagenation();
  }
  public clearSearch(): void {
    // Reset search term and pagination
    this.search = "";
    this.EmployeeFilterObj.additionalSearch = "";
    this.pageInput = 1;
    // Reset filters if role-based filtering is applied
    if (this.rolesentriesCount) {
      this.EmployeeFilterObj.filterQuery = "";
    } else {
      this.EmployeeFilterObj.filterOn = "";
      this.EmployeeFilterObj.filterQuery = "";
    }
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
      // this.getEmployeePagenation();
    } else {
      this.EmployeeFilterObj.sortBy = sortBy;
      this.EmployeeFilterObj.isAscending = true;
      // this.getEmployeePagenation();
    }
    this.getEmployeePagenation();
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
  public filterByRole(role: string): void {
    this.selectedRole = role;
    if (role === '') {
      this.EmployeeFilterObj.filterOn = "";
      this.EmployeeFilterObj.filterQuery = "";
      this.rolesentriesCount = false;
    } else {
      this.EmployeeFilterObj.filterOn = "role";
      this.EmployeeFilterObj.filterQuery = role;
      this.rolesentriesCount = true;
    }

    this.EmployeeFilterObj.pageNumber = 1;
    this.getEmployeePagenation();
  }
  closeModal() {
    console.log("dsf")
    if (this.dialogref) {
      this.dialogref.close();
    }
  }
  public addMemberFun(id: number, name: string) {
    if (!this.MemberAlreadyExist(id)) {
      this.projectMembers.push({
        id: id,
        name: name,
      });
      console.log("data name and id", id, name);
    }
  }
  public MemberAlreadyExist(id: number): boolean {
    return this.projectMembers.some(member => member.id === id);
  }
  toggleMemberStatus(id: number, name: string): void {
    if (this.MemberAlreadyExist(id)) {
      this.removeMemberFun(id);
    } else {
      this.addMemberFun(id, name);
    }
  }
  
  removeMemberFun(id: number): void {
    this.projectMembers = this.projectMembers.filter(member => member.id !== id);
  }
  
}
