import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentModuleRoutingModule } from './department-module-routing.module';
import { DepartmentlistComponent } from './Components/departmentlist/departmentlist.component';
import { DepartmentAddComponent } from './Components/department-add/department-add.component';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import {  HttpClientModule } from '@angular/common/http';
// import { DeleteComponentComponent } from '../../SharedModules/shared/components/delete-component/delete-component.component';
import { FormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';

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
  ]
})
export class DepartmentModuleModule { }
