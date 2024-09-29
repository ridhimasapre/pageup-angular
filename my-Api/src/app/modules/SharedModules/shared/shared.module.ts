import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { DeleteComponentComponent } from './components/delete-component/delete-component.component';
import {DeleteComponentComponent} from '../shared/components/delete-component/delete-component.component'
// import {MatDialog, MatDialogModule, MatDialogRef} from import'@angular/material/dialog';
// import {MatButton, MatButtonModule} from '@angular/material/button';
// import {MatDialogActions,MatDialogClose,MatDialogContent,MatDialogTitle,} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogClose } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDialogTitle } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../../../app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { LoadingComponent } from './Loader/loading/loading.component';
import { ToastrModule } from 'ngx-toastr';
import { SidebarComponent } from './Sidebar/sidebar/sidebar.component';
import { HeaderComponent } from './Header/header/header.component';
import { PaginationComponent } from './Pagination/pagination/pagination.component';
@NgModule({
  declarations: [
    DeleteComponentComponent,
    LoadingComponent,
    SidebarComponent,
    HeaderComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatSlideToggle,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatDialogModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    MatButton,
  ],
  exports: [
    DeleteComponentComponent,
    ToastrModule,
    LoadingComponent,
    SidebarComponent,
    HeaderComponent,
    PaginationComponent
  ]
})
export class SharedModule { }
