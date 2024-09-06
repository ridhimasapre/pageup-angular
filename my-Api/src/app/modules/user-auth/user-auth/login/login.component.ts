import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { LoginForm, LoginRequest } from '../Model/login.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
// public loginForm!: FormGroup;
public isSubmitting:boolean=false;
// public username:string="";
// public password:string="";
public userInfo={
  username:"",
  password:""
}
public loginForm: FormGroup<LoginForm> = this.createForm();
constructor(private authService:AuthService,private router:Router){}
ngOnInit(): void {
}
public createForm() :FormGroup<LoginForm>{
  return new FormGroup<LoginForm>({
  username:new FormControl ('', [Validators.required]),
  password: new FormControl('', [Validators.required, Validators.minLength(6)])
})
};
onSubmit(): void {
  if (this.loginForm.valid) {
    const userInfo: LoginRequest = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!
    };
    console.log('logindata', userInfo);

    this.authService.Login(userInfo).subscribe(data => {
      if (data) {
        console.log(data);
        localStorage.setItem('token', data.data.token);
        this.router.navigateByUrl("/departmentlist");
      } else {
        console.log('Login failed', data);
      }
    });
  }
}
}
