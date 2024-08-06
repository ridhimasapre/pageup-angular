import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { TodoSelectedComponent } from './todo-selected/todo-selected.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterdDataInfoComponent } from './registerd-data-info/registerd-data-info.component';
import { ChangecolorDirective } from './color/changecolor.directive';
import { HttpClientModule } from '@angular/common/http';
// import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoSelectedComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    RegisterdDataInfoComponent,
    ChangecolorDirective,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
