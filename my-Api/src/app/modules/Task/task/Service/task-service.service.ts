import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task,PagenatorRequest,TaskResponse, TaskById ,AllTaskByIdRequest, TaskByIdData, ParentTaskRequest, ParentTaskResponse, TaskAddRequest, AddTaskResponse} from '../model/task-model';
import { environment } from '../../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  public token=environment.token;
  private headers =new HttpHeaders({
    'Authorization':`Bearer ${this.token}`
  });
public Pagenationurl=`${environment.apiUrl}/api/Tasks/GetAllTasks`
public Deleteurl=`${environment.apiUrl}/api/Tasks`
public TaskById=`${environment.apiUrl}/api/Tasks/GetAllTasks`
public Employeeurl = `${environment.apiUrl}/api/Employees/GetAllEmployee`;
public addurl = `${environment.apiUrl}/api/Tasks`;
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
  public getTaskDetailByID(body:AllTaskByIdRequest):Observable<TaskByIdData>{
    return this.httpClient.post<TaskByIdData>(this.TaskById,body,{headers:this.headers})
  }
  public addTask(body:AddTaskResponse):Observable<TaskAddRequest>{
    return this.httpClient.post<TaskAddRequest>(this.addurl,body,{headers:this.headers})
  }
}
