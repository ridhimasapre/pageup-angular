import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskRoutingModule } from './task-routing.module';
import { TaskListComponent } from './Component/task-list/task-list.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatDialog, MatDialogActions } from '@angular/material/dialog';
import { TaskViewComponent } from './Component/task-view/task-view.component';


@NgModule({
  declarations: [
    TaskListComponent,
    TaskViewComponent
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
  ],
  exports:[
    TaskListComponent
  ]
})
export class TaskModule { }
