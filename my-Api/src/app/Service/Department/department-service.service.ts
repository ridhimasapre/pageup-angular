import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddDepartmentResponse, department, DepartmentDeleteResponse, DepartmentPagenatorRequest, DepartmentPagenatorResponse, DepartmentRequest, departmentResponse, generic } from '../../Interface/Department';
import { environment } from '../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { EmployeeResponseById } from '../../Interface/Employee';


@Injectable({
  providedIn: 'root'
})
export class DepartmentServiceService {
  public token="eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiTmFtZSI6IkpheSIsIklkIjoiMiIsIkd1aWQiOiJiM2M0MjM1OC05NTQ1LTQwNTMtOWI4Zi03Yzk3ZTExZTBkODMiLCJleHAiOjE3MjM3MTE1MTYsImlzcyI6Ikp3dElzc3VlciIsImF1ZCI6Ikp3dEF1ZGllbmNlIn0.-vaWQZfNoife7pSsXnTTKFXNpIXcdOflQe9SxgDR5OU"
  // public url=`${environment.apiUrl}/api/Department/GetallDepartments`;
  public url=`${environment.apiUrl}/api/Department`;
  public PaginatorUrl =`${environment.apiUrl}/api/Department/GetallDepartments`
  public IdUrl =`${environment.apiUrl}/api/Department/GetDepartmentBy`
  public updatedUrl=`${environment.apiUrl}/api/Department`



  constructor(private httpClient: HttpClient) { }
  
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}` 
  });


  public getDepartmentList(): Observable<generic<department[]>> {
    return this.httpClient.get<generic<department[]>>(this.url, { headers: this.headers });
  } 

  public deleteDepartment(id: number): Observable<DepartmentDeleteResponse> {
    return this.httpClient.delete<DepartmentDeleteResponse>(`${this.url}/${id}`, { headers: this.headers });
  }

  public getDepartmentById(id: number): Observable<generic<department>> {
    return this.httpClient.get<generic<department>>(`${this.IdUrl}${id}`, { headers: this.headers })
  }

  public AddDepartment(data: DepartmentRequest): Observable<AddDepartmentResponse> {
    return this.httpClient.post<AddDepartmentResponse>(this.url, data, { headers: this.headers });
  }
  public PaginationDepartment(data:DepartmentPagenatorRequest):Observable<DepartmentPagenatorResponse>{
   return this.httpClient.post<DepartmentPagenatorResponse>(this.PaginatorUrl, data,{headers:this.headers})
  }
  // public getAllDepartment(data:DepartmentPagenatorRequest):Observable<DepartmentPagenatorResponse>{
  //   return this.httpClient.post<DepartmentPagenatorResponse>(this.PaginatorUrl, data,{headers:this.headers})
  //  }
  public updateDepartment(id:number,body:unknown):Observable<department>{
    return this.httpClient.put<department>(this.updatedUrl, body,{headers:this.headers})
   }
}
