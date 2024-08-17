import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../Service/Project/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../../Interface/Project';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrl: './view-project.component.css'
})
export class ViewProjectComponent implements OnInit{
  public projectId!: number;
  public project: Project[]=[];
  public errorMsg: string = '';
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
      // this.project = data;
    },
    error: (err) => {
      this.errorMsg = 'Error loading project details';
    }
  });
}
}
