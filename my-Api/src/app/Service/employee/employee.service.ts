import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AddEmployeeRequest,AddEmployeeResponse,EmployeeRole,UpdateEmployeeRequest,UpdatedEmployeeResponse,EmployeeDeleteResponse,EmployeeForm,EmployeeResponse,EmployeeResponseById, EmployeePagenatorRequest, EmployeePagenatorResponse, Employee, RoleCountResponse } from '../../Interface/Employee';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // public token="eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiTmFtZSI6IlJpZGhpbWEgU2FwcmUiLCJJZCI6IjMiLCJHdWlkIjoiNzI3NWM4NWEtYTU4Zi00OGU0LWJkOWUtMDM0ZTczMTljN2YwIiwiZXhwIjoxNzI0NzU3ODc5LCJpc3MiOiJKd3RJc3N1ZXIiLCJhdWQiOiJKd3RBdWRpZW5jZSJ9.owYJFGSinpjguttKip8zJcV1vQKFZ6ArnzjlKngFYMY"
  public token="eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiTmFtZSI6IlJpZGhpbWEgU2FwcmUiLCJJZCI6IjMiLCJHdWlkIjoiNTNmODhlNmUtNDQ2MS00N2U4LTg0ODQtNWVhZjlhNGU1MWZhIiwiZXhwIjoxNzI0NzY2MDQ2LCJpc3MiOiJKd3RJc3N1ZXIiLCJhdWQiOiJKd3RBdWRpZW5jZSJ9.3AQz5WC_DWZCM4gQIozpAhhHXjBQX-lpHwpzNkQ-FmI"
  public url = `${environment.apiUrl}/api/Employees/GetAllEmployee`;
  public pagenationUrl= `${environment.apiUrl}/api/Employees/GetAllEmployee`
  public DeleteUrl=`${environment.apiUrl}/api/Employees/DeleteBy`
  public addUrl=`${environment.apiUrl}/api/Employees/AddEmployee`
  public IdUrl=`${environment.apiUrl}/api/Employees/GetBy`
  public adminUrl=`${environment.apiUrl}/api/Department/GetEmployeesUnderDepartment`
  public roleCountUrl=`${environment.apiUrl}/api/Employees/getCount?role=`

    constructor(private httpClient:HttpClient) { }
    private headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` 
    })
    
    public getEmployee(): Observable<EmployeeResponse> {
      return this.httpClient.get<EmployeeResponse>(this.url, { headers: this.headers });
    } 
    public deleteEmployee(id: number): Observable<EmployeeDeleteResponse> {
      return this.httpClient.delete<EmployeeDeleteResponse>(`${this.DeleteUrl}/${id}`, { headers: this.headers });
    }
    public AddEmployee(data: unknown): Observable<AddEmployeeResponse> {
      return this.httpClient.post<AddEmployeeResponse>(this.addUrl, data, { headers: this.headers });
    }
    public EmployeeById(id: number): Observable<EmployeeResponseById>{
      return this.httpClient.get<EmployeeResponseById>(`${this.IdUrl}/${id}`, {headers:this.headers});
    }
    public updatedEmployee(data: unknown, id: number): Observable<UpdatedEmployeeResponse>{
      
      return this.httpClient.put<UpdatedEmployeeResponse>(`${this.url}/${id}`, data, {headers:this.headers});
    }
    public PaginationEmployee(data:EmployeePagenatorRequest):Observable<EmployeePagenatorResponse>{
      return this.httpClient.post<EmployeePagenatorResponse>(this.pagenationUrl,data,{headers:this.headers})
    }
    public getEmployeesByDepartment(departmentId: number): Observable<EmployeeResponse> {
      return this.httpClient.get<EmployeeResponse>(`${this.adminUrl}/${departmentId}`,{headers:this.headers});
    }
    public getRoleCount(role: EmployeeRole): Observable<RoleCountResponse> {
      return this.httpClient.post<RoleCountResponse>(`${this.roleCountUrl}${role}`, { headers: this.headers });
    }
}
