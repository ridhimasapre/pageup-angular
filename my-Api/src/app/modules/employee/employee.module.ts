import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './Component/employee-list/employee-list.component';
import { EmployeeAddComponent } from './Component/employee-add/employee-add.component';
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialog, MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../SharedModules/shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
    SharedModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerToggle,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatLabel,
    MatDialogActions,
    
  ]
})
export class EmployeeModule { }
