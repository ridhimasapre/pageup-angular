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
  // public token="eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiTmFtZSI6IkpheSIsIklkIjoiMSIsIkd1aWQiOiJjMjJiNjIxYy00ODhmLTQ0MGYtODM1NC1kMjE2NjU2OWFmNWIiLCJleHAiOjE3MjMzNzMzMzIsImlzcyI6Ikp3dElzc3VlciIsImF1ZCI6Ikp3dEF1ZGllbmNlIn0.DFbeI3vPLsYosRZj63K9vTjCxSbH3itkWKRTK483Ys8"
  // public token="eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiTmFtZSI6IkpheSIsIklkIjoiMiIsIkd1aWQiOiI2MWRiYzdhZS1kODAxLTQ0YTQtODJjNS04NDhkMTljMzllM2MiLCJleHAiOjE3MjM3MDg5OTcsImlzcyI6Ikp3dElzc3VlciIsImF1ZCI6Ikp3dEF1ZGllbmNlIn0._PYn_X-miGdPtvo9TDQpd1d4fIEep-8WgLryqgD2Gm4"
public token="eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiTmFtZSI6IkpheSIsIklkIjoiMiIsIkd1aWQiOiJiM2M0MjM1OC05NTQ1LTQwNTMtOWI4Zi03Yzk3ZTExZTBkODMiLCJleHAiOjE3MjM3MTE1MTYsImlzcyI6Ikp3dElzc3VlciIsImF1ZCI6Ikp3dEF1ZGllbmNlIn0.-vaWQZfNoife7pSsXnTTKFXNpIXcdOflQe9SxgDR5OU"
  public url = `${environment.apiUrl}/api/Employees/GetAllEmployee`;
  public pagenationUrl= `${environment.apiUrl}//api/Employees/GetAllEmployee`
  public DeleteUrl=`${environment.apiUrl}/api/Employees/DeleteBy`
  public addUrl=`${environment.apiUrl}/api/Employees/AddEmployee`
  public IdUrl=`${environment.apiUrl}/api/Employees/GetBy`
  public adminUrl=`${environment.apiUrl}/api/Department/GetEmployeesUnderDepartment`
  // public getAlldepartment =`${environment.apiUrl}/api/Department/GetallDepartments`


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
