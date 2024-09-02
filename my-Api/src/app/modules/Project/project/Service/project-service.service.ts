import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project,projectEmployeeitem,ProjectResponse,PagenatorRequest, AddRequest, ProjectStatus ,Sprint,SprintById} from '../model/project-model';
import { environment } from '../../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

public token=environment.token
public url=`${environment.apiUrl}/api/Project`
public IdUrl=`${environment.apiUrl}/api/Project`
public UpdateUrl=`${environment.apiUrl}/api/Project?projectId`
public Paginatedurl=`${environment.apiUrl}/api/Project/GetAllProjects`
public statusCountUrl=`${environment.apiUrl}/api/Project/getCount?status=0`
public deleteMemberUrl=`${environment.apiUrl}/api/Project?employeeId=`
public sprintByIdUrl=`${environment.apiUrl}/api/Sprint`

constructor(private httpClient:HttpClient) { }
  private headers =new HttpHeaders({
    'Authorization':`Bearer ${this.token}`
  });
  public GetProject():Observable<ProjectResponse<Project[]>>{
    return this.httpClient.get<ProjectResponse<Project[]>>(this.url,{headers:this.headers})
  }
  public AddProject(body: unknown): Observable<ProjectResponse<number>>{
    return this.httpClient.post<ProjectResponse<number>>(this.url, body, { headers: this.headers });
  }
  public PaginationProject(data:PagenatorRequest):Observable<ProjectResponse<Project[]>>{
    return this.httpClient.post<ProjectResponse<Project[]>>(this.Paginatedurl, data,{headers:this.headers})
   }
   public getProjectById(id: number): Observable<ProjectResponse<Project>> {
    return this.httpClient.get<ProjectResponse<Project>>(`${this.IdUrl}/${id}`, { headers: this.headers })
  }
  public updateProject(id:number,body:unknown):Observable<Project>{
    return this.httpClient.put<Project>(this.UpdateUrl, body,{headers:this.headers})
   }
   public getStatusCount(status: ProjectStatus): Observable<ProjectResponse<number>> {
    return this.httpClient.post<ProjectResponse<number>>(`${this.statusCountUrl}${status}`, { headers: this.headers });
  }
  removeProjectMember(projectId: number, memberId: number): Observable<ProjectResponse<boolean>>{
    return this.httpClient.delete<ProjectResponse<boolean>>(`${this.deleteMemberUrl}${memberId}&projectId=${projectId}`);
  }
  public getSprintById(taskId:number):Observable<SprintById<Sprint[]>>{
    return this.httpClient.get<SprintById<Sprint[]>>(`${this.sprintByIdUrl}/${taskId}`,{headers:this.headers})
  }
}
