import { Component, OnInit } from '@angular/core';
import { department, DepartmentPagenatorResponse } from '../../Model/department.model';
import { DepartmentServiceService } from '../../Service/department-service.service';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentAddComponent } from '../department-add/department-add.component';
import { Router } from '@angular/router';
import { DeleteServiceService } from '../../../../SharedModules/shared/services/delete-service.service';
import { AuthService } from '../../../../user-auth/user-auth/service/auth.service';
@Component({
  selector: 'app-departmentlist',
  templateUrl: './departmentlist.component.html',
  styleUrl: './departmentlist.component.css'
})
export class DepartmentlistComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public departmentList: department[] = [];
  public departmentNotFound: string = "";
  public pageInput: number = 1;
  public errorMsg: string = "";
  public maxPage: number = 1;
  public filterObj = {
    filterOn: "",
    filterQuery: "",
    sortBy: "",
    isAscending: true,
    pageNumber: 1,
    pageSize: 10,
    startDate:null,
    endDate:null,
  }
  public totalEntriesCount: number = 0;
  constructor(
    private departmentservice: DepartmentServiceService,
    private httpclient: HttpClient,
    private deleteservice: DeleteServiceService,
    private authService: AuthService,
    public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.getPagination();
  }
  // public addDepartment(): void {
  //   const dialogRef = this.dialog.open(DepartmentAddComponent, {
  //     width: '400px'
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result && result.length > 0) {
  //       result.forEach((dept: { name: string }) => {
  //         this.departmentservice.AddDepartment(dept).subscribe({
  //           next: () => {
  //             console.log("Department added");
  //             this.getPagination();
  //           },
  //           error: (error) => {
  //             if (error.status === 409) {
  //               console.error('Department already exists');
  //               alert(`Department "${dept.name}" already exists`);
  //             } else {
  //               console.error('Error adding department', error);
  //               alert('An error occurred while adding the department');
  //             }
  //           }
  //         });
  //       });
  //     }
  //   });
  // }
  public openDepartmentModal(department?: department): void {
    const dialogRef = this.dialog.open(DepartmentAddComponent, {
      width: '400px',
      data: department ? department : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.length > 0) {
        if (department) {
          // Update existing department
          this.departmentservice.updateDepartment(result).subscribe({
            next: () => {
              console.log("Department updated");
              this.getPagination();
            },
            error: (error) => {
              console.error('Error updating department', error);
              alert('An error occurred while updating the department');
            }
          });
        } else {
          // Add new department
          result.forEach((dept: { name: string }) => {
            this.departmentservice.AddDepartment(dept).subscribe({
              next: () => {
                console.log("Department added");
                this.getPagination();
              },
              error: (error) => {
                if (error.status === 409) {
                  console.error('Department already exists');
                  alert(`Department "${result.name}" already exists`);
                } else {
                  console.error('Error adding department', error);
                  alert('An error occurred while adding the department');
                }
              }
            });
          });
        }
      }
    });
  }

  public addDepartment(): void {
    this.openDepartmentModal();
  }
  public updateDepartment(department: department): void {
    this.openDepartmentModal(department);
  }
  public delete(id: number | null): void {
    this.deleteservice.openConfirmDialog('Are you sure to delete this Name?').afterClosed().subscribe(data => {
      if (data) {
        if (id !== null && id !== undefined) {
          this.departmentservice.deleteDepartment(id).subscribe(() => {
            console.log("deleted");
            this.totalEntriesCount--;
            this.getPagination();
          });
        } else {
          console.error("Invalid ID");
        }
      }
    });
  }
  public getPagination(): void {
    this.departmentservice.PaginationDepartment(this.filterObj).subscribe({
      next: (res: DepartmentPagenatorResponse) => {
        this.departmentList = res.data;
        this.totalEntriesCount = res.totalEntriesCount;
        // this.updateMaxPage();
        if (this.paginator) {
          this.paginator.length = this.totalEntriesCount;
        }
        console.log(res.data);
      }
    })
  }
  public changePageSize(newSize: number): void {
    this.filterObj.pageSize = newSize;
    this.getPagination();
  }

  public onSearch(): void {

    this.filterObj.filterQuery = this.filterObj.filterQuery.trim();
    this.filterObj.pageNumber = 1;
    this.getPagination();
  }

  // public onPageEvent(event: PageEvent): void {
  //   this.filterObj.pageSize = event.pageSize;
  //   this.filterObj.pageNumber = event.pageIndex + 1;
  //   this.getPagination();
  //   console.log("pages", event)
  // }

  public sortDep(sortBy: string): void {
    if (this.filterObj.sortBy === sortBy) {
      this.filterObj.isAscending = !this.filterObj.isAscending;
      // this.getPagination();
    } else {
      this.filterObj.sortBy = sortBy;
      this.filterObj.isAscending = true;
    }
    this.getPagination();
  }

  //jump on the particular page
  // public goToPage(): void {
  //   if (this.pageInput && this.pageInput > 0 && this.pageInput <= this.maxPage) {
  //     const event: PageEvent = {
  //       pageIndex: this.pageInput - 1,
  //       pageSize: this.filterObj.pageSize,
  //       length: this.totalEntriesCount
  //     };
  //     this.onPageEvent(event);
  //     this.getPagination();
  //     this.errorMsg = ''
  //   } else {
  //     this.errorMsg = `page number ${this.pageInput} does not exist`
  //     this.pageInput = 1;

  //   }
  // }
  // private updateMaxPage(): void {
  //   this.maxPage = Math.ceil(this.totalEntriesCount / this.filterObj.pageSize);
  // }
  //index no in continuous manner
  public getGlobalIndex(index: number): number {
    return (this.filterObj.pageNumber - 1) * this.filterObj.pageSize + index + 1;
  }
  public clearSearch(): void {
    this.filterObj.filterQuery = '';
    this.pageInput = 1;
    this.getPagination();
  }
  onPageChange(page: number) {
    this.filterObj.pageNumber = page;
    this.getPagination()
  }
  public onPageSizeChange(newPageSize: number): void {
    this.filterObj.pageSize = newPageSize; // Update page size
    this.filterObj.pageNumber = 1; // Reset to first page on page size change
    this.getPagination(); // Fetch new data with updated page size
  }
    public applyDateFilter(): void {
    if (this.filterObj.startDate && this.filterObj.endDate) {
      this.filterObj.pageNumber=1;
      // this.getPagination();
    } else {
      this.filterObj.startDate = null;
      this.filterObj.endDate = null;
    }

    this.getPagination();
  }
}
