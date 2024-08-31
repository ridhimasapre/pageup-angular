import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../Service/Project/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, ProjectStatus} from '../../../Interface/Project';
import { Employee } from '../../../Interface/Employee';
@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrl: './view-project.component.css'
})
export class ViewProjectComponent implements OnInit{
  public projectId!: number;
  // public project: Project[]=[];
  public ProjectList : Project[]=[]; 
  public employeeList:Employee[]=[]
  // public projectStatus:ProjectStatus[]=[];
  public projectStatus=ProjectStatus;
  public project! : Project
  public errorMsg: string = "";
  public selectedStatus:string="";
constructor(private projectService:ProjectService,private router:Router,private activatedroute:ActivatedRoute){}
ngOnInit(): void {
 this.getProjectId();
}
public getProjectId():void{
  this.activatedroute.paramMap.subscribe(data=>{
    this.projectId=Number(data.get("id"));
    this.getProjectDetails(this.projectId);
  })
}
getProjectDetails(id:number): void {
  this.projectService.getProjectById(id).subscribe({
    next: (data) => {
      console.log("view data",data);
      this.project=data.data;
    }
  });
}
public removeMember(i: number): void {
  this.ProjectList.splice(i, 1);
}
getStatus(status:ProjectStatus){
  if (status === ProjectStatus.created) {
    return "Created";
  } else if (status === ProjectStatus.running) {
    return "Running";
  } else if(status === ProjectStatus.completed) {
    return "Completed";
  }else{
    return "Unknown Status please Check First"
  }
}
}
