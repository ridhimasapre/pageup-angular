import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AddEmployeeRequest,AddEmployeeResponse,UpdateEmployeeRequest,UpdatedEmployeeResponse ,EmployeeDeleteResponse,EmployeeForm,EmployeeResponse, EmployeeResponseById } from '../../Interface/Employee';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // public token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiTmFtZSI6IkpheSIsIklkIjoiMSIsIkd1aWQiOiIyMGIzNzM3My03ZDI0LTRhYmEtYTY2MS05MjI2YmRiZmM5ZWUiLCJleHAiOjE3MjMyODk0MTAsImlzcyI6Ikp3dElzc3VlciIsImF1ZCI6Ikp3dEF1ZGllbmNlIn0.o6DdWCOe_QvKVzD0xsywEa_Cu3oQUzhnsITPJS959ZA";
  public token ="eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJQcmluY2UiLCJJZCI6IjEiLCJVc2VySWQiOiIzIiwianRpIjoiMTViYzZlZDUtN2ZkYS00ZmFmLWE3ODktZjU5OTk1MjYzODFkIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTcyMzMwOTM3OSwiaXNzIjoiSnd0SXNzdWVyIiwiYXVkIjoiSnd0QXVkaWVuY2UifQ.YgeX6nyh_Qetk2cHSFLXif7g4EdPADnYMr4MZOmlOsE"
  public url = `${environment.apiUrl}/api/Employees/GetAllEmployee`;

    constructor(private httpClient:HttpClient) { }

    private headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` 
    })

    public getEmployee(): Observable<EmployeeResponse> {
      return this.httpClient.get<EmployeeResponse>(this.url, { headers: this.headers });
    } 
    public deleteEmployee(id: number): Observable<EmployeeDeleteResponse> {
      return this.httpClient.delete<EmployeeDeleteResponse>(`${this.url}/${id}`, { headers: this.headers });
    }
    public AddEmployee(data: AddEmployeeRequest): Observable<AddEmployeeResponse> {
      return this.httpClient.post<AddEmployeeResponse>(this.url, data, { headers: this.headers });
    }
    public EmployeeById(id: number): Observable<EmployeeResponseById>{
      
      return this.httpClient.get<EmployeeResponseById>(`${this.url}/${id}`, {headers:this.headers});
    }
    public updatedEmployee(data: unknown, id: number): Observable<UpdatedEmployeeResponse>{
      
      return this.httpClient.put<UpdatedEmployeeResponse>(`${this.url}/${id}`, data, {headers:this.headers});
    }
  
}
