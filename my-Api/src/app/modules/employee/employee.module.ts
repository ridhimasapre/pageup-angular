import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './Component/employee-list/employee-list.component';
import { EmployeeAddComponent } from './Component/employee-add/employee-add.component';
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeAddComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatPaginator,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ]
})
export class EmployeeModule { }
