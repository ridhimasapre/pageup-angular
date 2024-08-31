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
  public token=environment.token
  public url = `${environment.apiUrl}/api/Employees/GetAllEmployee`;
  public pagenationUrl= `${environment.apiUrl}/api/Employees/GetAllEmployee`
  public DeleteUrl=`${environment.apiUrl}/api/Employees/DeleteBy`
  public addUrl=`${environment.apiUrl}/api/Employees/AddEmployee`
  public IdUrl=`${environment.apiUrl}/api/Employees/GetBy`
  public adminUrl=`${environment.apiUrl}/api/Department/GetEmployeesUnderDepartment`
  public roleCountUrl=`${environment.apiUrl}/api/Employees/getCount?role=`
  public updateUrl=`${environment.apiUrl}/api/Employees/UpdateBy`

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
      
      return this.httpClient.put<UpdatedEmployeeResponse>(`${this.updateUrl}/${id}`, data, {headers:this.headers});
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
