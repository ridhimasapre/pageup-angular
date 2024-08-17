import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AddEmployeeRequest,AddEmployeeResponse,UpdateEmployeeRequest,UpdatedEmployeeResponse ,EmployeeDeleteResponse,EmployeeForm,EmployeeResponse,EmployeeResponseById, EmployeePagenatorRequest, EmployeePagenatorResponse, Employee } from '../../Interface/Employee';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public token="eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiTmFtZSI6IkpheSIsIklkIjoiMiIsIkd1aWQiOiI1NmM2MzUxYS04OWNhLTQ5NWItODhiZS00OTc1YTk1NWUyMDEiLCJleHAiOjE3MjQyMzAyODIsImlzcyI6Ikp3dElzc3VlciIsImF1ZCI6Ikp3dEF1ZGllbmNlIn0.J9am8RH9tOZEuOo6e4z7HxWA-65YPov1_AO9rc1uAu8"
  public url = `${environment.apiUrl}/api/Employees/GetAllEmployee`;
  public pagenationUrl= `${environment.apiUrl}//api/Employees/GetAllEmployee`
  public DeleteUrl=`${environment.apiUrl}/api/Employees/DeleteBy`
  public addUrl=`${environment.apiUrl}/api/Employees/AddEmployee`
  public IdUrl=`${environment.apiUrl}/api/Employees/GetBy`
  public adminUrl=`${environment.apiUrl}/api/Department/GetEmployeesUnderDepartment`

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
    public AddEmployee(data: AddEmployeeRequest): Observable<AddEmployeeResponse> {
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
}
