import { FormControl } from "@angular/forms";

export interface LoginResponse<T> {
    success: boolean;
    status: number; 
    message: string;
    data: T;
  }  
  export interface LoginUser {
    employee: TypeOfEmployee;
    token: string;
    role:Role;
  }
  export interface LoginRequest {
    username: string;
    password: string;
  }
  export interface LoginForm{
    username:FormControl<string | null>,
    password:FormControl<string | null>
  }
  export enum Role {
    Employee = 1,
    Admin = 2,
    SuperAdmin = 3
  }
  export interface TypeOfEmployee{
    id: number;
    name: string;
    role: Role;
    isAdmin: boolean;
  }
  