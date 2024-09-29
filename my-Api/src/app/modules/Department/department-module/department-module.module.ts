import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentModuleRoutingModule } from './department-module-routing.module';
import { DepartmentlistComponent } from './Components/departmentlist/departmentlist.component';
import { DepartmentAddComponent } from './Components/department-add/department-add.component';
import { MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import {  HttpClientModule } from '@angular/common/http';
// import { DeleteComponentComponent } from '../../SharedModules/shared/components/delete-component/delete-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { SharedModule } from '../../SharedModules/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule, MatDatepickerToggle, MatDateRangeInput } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    DepartmentlistComponent,
    DepartmentAddComponent,
  ],
  imports: [
    CommonModule,
    DepartmentModuleRoutingModule,
    MatDialogActions,
    MatLabel,
    MatFormFieldModule,
    MatDialogContent,
    HttpClientModule,
    FormsModule,
    MatPaginator,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerToggle,
  ]
})
export class DepartmentModuleModule { }
