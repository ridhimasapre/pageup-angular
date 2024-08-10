import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentComponent } from './Components/Department/department/department.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DeleteComponent } from './Components/Department/delete/delete.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './Components/Department/add/add.component';
import { MatDialogActions,MatDialogClose,MatDialogContent,MatDialogTitle} from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { EmployeeComponent } from './Components/Employee/employee/employee.component';
import { AddEmployeeComponent } from './Components/Employee/add-employee/add-employee.component';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EmployeeDeleteComponent } from './Components/Employee/employee-delete/employee-delete.component';
import { Sort } from '@angular/material/sort';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProjectComponent } from './Components/Project/project/project.component';
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
  ],
  providers: [
    provideAnimationsAsync()
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
