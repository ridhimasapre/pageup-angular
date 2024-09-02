import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddDepartmentResponse, department, DepartmentDeleteResponse, DepartmentPagenatorRequest, DepartmentPagenatorResponse, DepartmentRequest, departmentResponse, generic } from '../Model/department.model';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentServiceService {
  public token=environment.token
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

  // public updateDepartment(id:number,body:unknown):Observable<department>{
  //   return this.httpClient.put<department>(this.updatedUrl, body,{headers:this.headers})
  //  }
  public updateDepartment(department:department):Observable<department>{
    return this.httpClient.put<department>(this.updatedUrl, department,{headers:this.headers})
   }
}
