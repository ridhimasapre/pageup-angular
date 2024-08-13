import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project,projectEmployeeitem,ProjectResponse,PagenatorRequest, AddRequest } from '../../Interface/Project';
import { environment } from '../../../environments/environment';
// import { generic } from '../../Interface/Department';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
public token="eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiTmFtZSI6IkpheSIsIklkIjoiMiIsIkd1aWQiOiJiM2M0MjM1OC05NTQ1LTQwNTMtOWI4Zi03Yzk3ZTExZTBkODMiLCJleHAiOjE3MjM3MTE1MTYsImlzcyI6Ikp3dElzc3VlciIsImF1ZCI6Ikp3dEF1ZGllbmNlIn0.-vaWQZfNoife7pSsXnTTKFXNpIXcdOflQe9SxgDR5OU"
public url=`${environment.apiUrl}/api/Project`
public IdUrl=`${environment.apiUrl}/api/Project`
public UpdateUrl=`${environment.apiUrl}/api/Project?projectId`
public Paginatedurl=`${environment.apiUrl}/api/Project/GetAllProjects`
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

}

