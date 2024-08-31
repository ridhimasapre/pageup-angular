import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Task,PagenatorRequest,TaskResponse, TaskById ,AllTaskByIdRequest, TaskByIdData, ParentTaskRequest, ParentTaskResponse} from '../../Interface/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public token=environment.token;
  private headers =new HttpHeaders({
    'Authorization':`Bearer ${this.token}`
  });
public Pagenationurl=`${environment.apiUrl}/api/Tasks/GetAllTasks`
public Deleteurl=`${environment.apiUrl}/api/Tasks`
public TaskById=`${environment.apiUrl}/api/Tasks/GetAllTasks`
constructor(private httpClient:HttpClient) { }


  public PaginationTask(data:PagenatorRequest):Observable<TaskResponse<Task[]>>{
    return this.httpClient.post<TaskResponse<Task[]>>(this.Pagenationurl, data,{headers:this.headers})
   }
   public deleteTask(id: number): Observable<TaskResponse<boolean>> {
    return this.httpClient.delete<TaskResponse<boolean>>(`${this.Deleteurl}/${id}`, { headers: this.headers });
  }
  public getTaskById(body:AllTaskByIdRequest):Observable<TaskByIdData>{
    return this.httpClient.post<TaskByIdData>(this.TaskById,body,{headers:this.headers})
  }
  public getTaskByParent(body:ParentTaskRequest):Observable<ParentTaskResponse>{
    return this.httpClient.post<ParentTaskResponse>(this.TaskById,body,{headers:this.headers})
  }
}
