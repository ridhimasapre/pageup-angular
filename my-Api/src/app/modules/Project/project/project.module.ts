import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectAddComponent } from './Component/project-add/project-add.component';
import { ProjectViewComponent } from './Component/project-view/project-view.component';
import { ProjectListComponent } from './Component/project-list/project-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../../SharedModules/shared/shared.module';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    ProjectAddComponent,
    ProjectViewComponent,
    ProjectListComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    SharedModule,
    MatOptionModule,
    MatSelectModule
  ]
})
export class ProjectModule { }
