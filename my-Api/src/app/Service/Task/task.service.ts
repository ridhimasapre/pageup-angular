import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Task,PagenatorRequest,TaskResponse } from '../../Interface/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
public token="eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiTmFtZSI6IkpheSIsIklkIjoiMiIsIkd1aWQiOiI1NmM2MzUxYS04OWNhLTQ5NWItODhiZS00OTc1YTk1NWUyMDEiLCJleHAiOjE3MjQyMzAyODIsImlzcyI6Ikp3dElzc3VlciIsImF1ZCI6Ikp3dEF1ZGllbmNlIn0.J9am8RH9tOZEuOo6e4z7HxWA-65YPov1_AO9rc1uAu8"
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
