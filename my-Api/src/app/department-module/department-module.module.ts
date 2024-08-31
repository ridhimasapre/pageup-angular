import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentModuleRoutingModule } from './department-module-routing.module';
import { DepartmentSecComponent } from './department-sec/department-sec.component';
import { DepartmentAddComponent } from './department-add/department-add.component';


@NgModule({
  declarations: [
    DepartmentSecComponent,
    DepartmentAddComponent
  ],
  imports: [
    CommonModule,
    DepartmentModuleRoutingModule
  ]
})
export class DepartmentModuleModule { }
