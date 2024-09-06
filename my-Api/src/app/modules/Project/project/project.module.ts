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
import { MatFormField, MatSelectModule } from '@angular/material/select';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TaskRoutingModule } from '../../Task/task/task-routing.module';
import { TaskModule } from '../../Task/task/task.module';

@NgModule({
  declarations: [
    ProjectAddComponent,
    ProjectViewComponent,
    ProjectListComponent,
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    TaskRoutingModule,
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
    MatSelectModule,
    MatFormField,
    TaskModule
  ],
})
export class ProjectModule { }
