import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskRoutingModule } from './task-routing.module';
import { TaskListComponent } from './Component/task-list/task-list.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldControl, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect, MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatDialogActions, MatDialogRef,MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { TaskViewComponent } from './Component/task-view/task-view.component';
import { TaskAddComponent } from './Component/task-add/task-add.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TaskReviewComponent } from './Component/task-review/task-review.component';
import { AddTaskReviewComponent } from './Component/add-task-review/add-task-review.component';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LogsComponent } from './Component/logs/logs.component';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskViewComponent,
    TaskAddComponent,
    TaskReviewComponent,
    AddTaskReviewComponent,
    LogsComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MatPaginator,
    ReactiveFormsModule,
    FormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    MatFormField,
    MatDialogActions,
    MatPaginatorModule,
    MatDialogModule, 
    MatDialogActions,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  exports:[
    TaskListComponent,
    TaskViewComponent,
    TaskAddComponent
  ]
})
export class TaskModule { }
