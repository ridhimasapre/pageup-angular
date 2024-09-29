import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogActions,MatDialogClose,MatDialogContent,MatDialogTitle} from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule} from 'ngx-ui-loader';
import { MatDatepickerModule}  from '@angular/material/datepicker';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrModule } from 'ngx-toastr';
// import { loadingInterceptorInterceptor } from './modules/SharedModules/shared/Loader/Service/loading-interceptor.interceptor';
// import { AuthService } from './modules/user-auth/user-auth/service/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './modules/user-auth/user-auth/service/auth-interceptor/auth-interceptor.service';
import { LoaderService } from './modules/SharedModules/shared/Loader/Service/loader.service';
import { ToastrService } from 'ngx-toastr';
// import { toastrInterceptorInterceptor } from './modules/SharedModules/shared/ToasterService/toastr-interceptor.interceptor';
import { SharedModule } from './modules/SharedModules/shared/shared.module';
import { TaskModule } from './modules/Task/task/task.module';
@NgModule({
  declarations: [
    AppComponent,
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
    SharedModule,
    // NgxUiLoaderModule,
    // NgxUiLoaderHttpModule.forRoot({
    //   showForeground:true
    // }),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true
    }),
  ],
  providers: [
    provideAnimationsAsync(),
  //  [AuthService], 
   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  //  {provide:HTTP_INTERCEPTORS, useValue:loadingInterceptorInterceptor, multi:true},
  //  { provide: HTTP_INTERCEPTORS, useValue: toastrInterceptorInterceptor, multi: true },
   LoaderService, 
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule { }
