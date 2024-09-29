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
   // Set the token and role in localStorage after successful login
   public setLoginData(token: string, role: Role): void {
    localStorage.setItem('token', token);
    this.setUserRole(role);
  }

  // Method to set user role in localStorage
  public setUserRole(role: Role): void {
    localStorage.setItem('userRole', role.toString());
    this.userRole = role;
  }

  // Method to get the token from localStorage
  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Check if the user is authenticated
  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Role-based checks
  public isSuperAdmin(): boolean {
    return this.getUserRole() === 'SuperAdmin';
  }

  public isAdmin(): boolean {
    return this.getUserRole() === 'Admin';
  }

  public isEmployee(): boolean {
    return this.getUserRole() === 'Employee';
  }

  // Get user role from localStorage
  public getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  // Logout and clear data from localStorage
  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }
}