import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddDepartmentResponse, department, DepartmentDeleteResponse, DepartmentPagenatorRequest, DepartmentPagenatorResponse, DepartmentRequest, departmentResponse } from '../Interface/Department';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DepartmentServiceService {
  // public token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiTmFtZSI6IkpheSIsIklkIjoiMSIsIkd1aWQiOiIyMGIzNzM3My03ZDI0LTRhYmEtYTY2MS05MjI2YmRiZmM5ZWUiLCJleHAiOjE3MjMyODk0MTAsImlzcyI6Ikp3dElzc3VlciIsImF1ZCI6Ikp3dEF1ZGllbmNlIn0.o6DdWCOe_QvKVzD0xsywEa_Cu3oQUzhnsITPJS959ZA";
  // public token="eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJQcmluY2UiLCJJZCI6IjEiLCJVc2VySWQiOiIzIiwianRpIjoiMTViYzZlZDUtN2ZkYS00ZmFmLWE3ODktZjU5OTk1MjYzODFkIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTcyMzMwOTM3OSwiaXNzIjoiSnd0SXNzdWVyIiwiYXVkIjoiSnd0QXVkaWVuY2UifQ.YgeX6nyh_Qetk2cHSFLXif7g4EdPADnYMr4MZOmlOsE"
  // public token="eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJQcmluY2UiLCJJZCI6IjEiLCJVc2VySWQiOiIzIiwianRpIjoiMTViYzZlZDUtN2ZkYS00ZmFmLWE3ODktZjU5OTk1MjYzODFkIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTcyMzMwOTM3OSwiaXNzIjoiSnd0SXNzdWVyIiwiYXVkIjoiSnd0QXVkaWVuY2UifQ.YgeX6nyh_Qetk2cHSFLXif7g4EdPADnYMr4MZOmlOsE"
  // public token="eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiTmFtZSI6IkpheSIsIklkIjoiMSIsIkd1aWQiOiJjMjJiNjIxYy00ODhmLTQ0MGYtODM1NC1kMjE2NjU2OWFmNWIiLCJleHAiOjE3MjMzNzMzMzIsImlzcyI6Ikp3dElzc3VlciIsImF1ZCI6Ikp3dEF1ZGllbmNlIn0.DFbeI3vPLsYosRZj63K9vTjCxSbH3itkWKRTK483Ys8"
  public token="eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiTmFtZSI6IkpheSIsIklkIjoiMSIsIkd1aWQiOiJjMjJiNjIxYy00ODhmLTQ0MGYtODM1NC1kMjE2NjU2OWFmNWIiLCJleHAiOjE3MjMzNzMzMzIsImlzcyI6Ikp3dElzc3VlciIsImF1ZCI6Ikp3dEF1ZGllbmNlIn0.DFbeI3vPLsYosRZj63K9vTjCxSbH3itkWKRTK483Ys8"

  // public url = `${environment.apiUrl}/api/Department`;
  public url=`${environment.apiUrl}/api/Department`;
  // public PaginatorUrl =`${environment.apiUrl}/api/Paginated/GetDepartment`
  public PaginatorUrl =`${environment.apiUrl}/api/Paginated/GetDepartment`
  public UpdateUrl =`${environment.apiUrl}/api/Department`



  constructor(private httpClient: HttpClient) { }
  
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}` 
  });


  public getDepartmentList(): Observable<departmentResponse> {
    return this.httpClient.get<departmentResponse>(this.url, { headers: this.headers });
  } 

  public deleteDepartment(id: number): Observable<DepartmentDeleteResponse> {
    return this.httpClient.delete<DepartmentDeleteResponse>(`${this.url}/${id}`, { headers: this.headers });
  }

  public getDepartmentById(id: number): Observable<departmentResponse> {
    return this.httpClient.get<departmentResponse>(`${this.url}/${id}`, { headers: this.headers })
  }

  public AddDepartment(data: DepartmentRequest): Observable<AddDepartmentResponse> {
    return this.httpClient.post<AddDepartmentResponse>(this.url, data, { headers: this.headers });
  }
  
  public PaginationDepartment(data:DepartmentPagenatorRequest):Observable<DepartmentPagenatorResponse>{
   return this.httpClient.post<DepartmentPagenatorResponse>(this.PaginatorUrl, data,{headers:this.headers})
  }
  public updateDepartment(id:number,body:unknown):Observable<department>{
    return this.httpClient.post<department>(`${this.UpdateUrl}/${id}`, body,{headers:this.headers})
   }
}
