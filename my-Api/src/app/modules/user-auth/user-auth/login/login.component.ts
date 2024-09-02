import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
public loginForm!: FormGroup;
public isSubmitting:boolean=false
constructor(private authService:AuthService){}
ngOnInit(): void {
  // console.log("hello");
  this.loginForm = new FormGroup({
    username:new FormControl ('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
}
onSubmit(): void {
  if (this.loginForm.valid) {
    this.isSubmitting = true;
    this.authService.Login(this.loginForm.value).subscribe(
      (response) => {
        console.log('Login successful:', response);
        this.isSubmitting = false; 
      },
      (error) => {
        console.error('Login failed:', error);
        this.isSubmitting = false;
      }
    );
  }
}
}
