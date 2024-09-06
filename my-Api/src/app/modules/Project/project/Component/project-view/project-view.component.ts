import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectServiceService } from '../../Service/project-service.service';
import { Project, ProjectStatus} from '../../model/project-model';
import { Employee } from '../../../../employee/Model/employee-model';
import { MatDialog,MatDialogModule } from '@angular/material/dialog';
import { ProjectModule } from '../../project.module';
import { TaskModule } from '../../../../Task/task/task.module';
import { TaskListComponent } from '../../../../Task/task/Component/task-list/task-list.component';
@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.css'
})
export class ProjectViewComponent implements OnInit{
  public projectId!: number;
  public ProjectList : Project[]=[]; 
  public employeeList:Employee[]=[]
  // public projectStatus:ProjectStatus[]=[];
  public projectStatus=ProjectStatus;
  public project! : Project
  public errorMsg: string = "";
  public selectedStatus:string="";
constructor(private projectService:ProjectServiceService,private router:Router,private activatedroute:ActivatedRoute){}
 ngOnInit(): void {
 this.getProjectId();
  }
  public getProjectId():void{
  this.activatedroute.paramMap.subscribe(data=>{
    this.projectId=Number(data.get("id"));
    this.getProjectDetails(this.projectId);
   })
  }
  public getProjectDetails(id:number): void {
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
