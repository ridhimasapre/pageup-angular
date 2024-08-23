import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Task,PagenatorRequest,TaskResponse } from '../../Interface/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public token="eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiTmFtZSI6IlJpZGhpbWEgU2FwcmUiLCJJZCI6IjMiLCJHdWlkIjoiNzZkZDc2ZDMtZGNjYi00YTk0LWI1NDktMWQ4MzFmNjE2ZTVmIiwiZXhwIjoxNzI0ODIzMzI1LCJpc3MiOiJKd3RJc3N1ZXIiLCJhdWQiOiJKd3RBdWRpZW5jZSJ9.YdAGom1nrHtlrWKx6bCD9-Qe1xXTTQvXwDWB4OLIjoM"
  private headers =new HttpHeaders({
    'Authorization':`Bearer ${this.token}`
  });

public Pagenationurl=`${environment.apiUrl}/api/Tasks/GetAllTasks`
public Deleteurl=`${environment.apiUrl}/api/Tasks`
  constructor(private httpClient:HttpClient) { }


  public PaginationTask(data:PagenatorRequest):Observable<TaskResponse<Task[]>>{
    return this.httpClient.post<TaskResponse<Task[]>>(this.Pagenationurl, data,{headers:this.headers})
   }
   public deleteTask(id: number): Observable<TaskResponse<boolean>> {
    return this.httpClient.delete<TaskResponse<boolean>>(`${this.Deleteurl}/${id}`, { headers: this.headers });
  }
  // public AddTask(body: unknown): Observable<TaskResponse<number>>{
  //   return this.httpClient.post<TaskResponse<number>>(this.url, body, { headers: this.headers });
  // }
}
