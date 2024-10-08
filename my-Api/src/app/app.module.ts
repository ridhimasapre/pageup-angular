import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentComponent } from './Components/Department/department/department.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DeleteComponent } from './Components/Department/delete/delete.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './Components/Department/add/add.component';
import { MatDialogActions,MatDialogClose,MatDialogContent,MatDialogTitle} from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { EmployeeComponent } from './Components/Employee/employee/employee.component';
import { AddEmployeeComponent } from './Components/Employee/add-employee/add-employee.component';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EmployeeDeleteComponent } from './Components/Employee/employee-delete/employee-delete.component';
import { ProjectComponent } from './Components/Project/project/project.component';
import { AddProjectComponent } from './Components/Project/add-project/add-project.component';
import { TaskComponent } from './Components/Task/task/task.component';
import { AddTaskComponent } from './Components/Task/add-task/add-task.component';
import { TaskDeleteComponent } from './Components/Task/TaskDelete/task-delete/task-delete.component';
import { DepartmentAddModalComponent } from './Components/Department/department-add-modal/department-add-modal.component';
import { ViewProjectComponent } from './Components/Project/view-project/view-project.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule} from 'ngx-ui-loader';
import { MatDatepickerModule}  from '@angular/material/datepicker';
import { TaskListComponent } from './Components/Task/task-list/task-list.component'
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { DepartmentSectionComponent } from './department-module/department-section/department-section.component';
@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    DeleteComponent,
    AddComponent,
    EmployeeComponent,
    AddEmployeeComponent,
    EmployeeDeleteComponent,
    ProjectComponent,
    AddProjectComponent,
    TaskComponent,
    AddTaskComponent,
    TaskDeleteComponent,
    DepartmentAddModalComponent,
    ViewProjectComponent,
    TaskListComponent,
    // DepartmentSectionComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatSlideToggle,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatDialogContent,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    CommonModule,
    MatSortModule,
    MatSelectModule,
    MatDatepickerModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true
    }),
  ],
  providers: [
    provideAnimationsAsync()
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
