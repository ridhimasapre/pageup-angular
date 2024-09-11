import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { LoginRequest,LoginResponse,LoginUser,Role} from '../Model/login.model';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userRole: Role | null=null;
  public url=`${environment.apiUrl}/api/Auth/Login`

  constructor(private httpclinet:HttpClient,private router:Router) { }
  
  public Login(data: LoginRequest ): Observable<LoginResponse<LoginUser>>{
    return this.httpclinet.post<LoginResponse<LoginUser>>(this.url, data);
  }
  public setUserRole(role: number): void {
    localStorage.setItem('userRole', role.toString()); 
    this.userRole = role as Role; 
  }
  // Method to get the token from localStorage
  static getToken(): string | null {
    return localStorage.getItem('token');
  }
  static isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!this.getToken();
  }
   // Role-based checks
   static isSuperAdmin(): boolean {
    return this.getUserRole() === 'SuperAdmin';
  }

  static  isAdmin(): boolean {
    return this.getUserRole() === 'Admin';
  }

  static isEmployee(): boolean {
    return this.getUserRole() === 'Employee';
  }
  static getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }
}