import { Component,OnInit } from '@angular/core';
import { Project, projectEmployeeitem, ProjectForm, subMembersForm} from '../../model/project-model';
import { Employee} from '../../../../employee/Model/employee-model';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup,FormControl,Validators, FormArray } from '@angular/forms';
import { ProjectServiceService } from '../../../project/Service/project-service.service';
import { EmployeeServiceService } from '../../../../employee/Service/employee-service.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeListComponent } from '../../../../employee/Component/employee-list/employee-list.component';
import { EmployeeProjectIDs } from '../../../project/model/project-model';
import { ProjectModule } from '../../project.module';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrl: './project-add.component.css'
})
export class ProjectAddComponent implements OnInit{
  public ProjectData:Project[]=[];
  public SelectedEmployeeList: Employee[] = [];
  public addedMembers:string[]=[];
  public projectMembers:EmployeeProjectIDs[]=[];
  public isEdit=  false;
  public dataFlag!:boolean;
  public paramId!:number;
  public myProjectForm: FormGroup<ProjectForm> = this.createForm();
  public ProjectFilterObj = {
    filterOn: "",
    filterQuery: "",
    sortBy: "",
    isAscending: true,
    pageNumber: -1,
    pageSize: -1,
    additionalSearch:""
  }
  constructor(private projectService:ProjectServiceService,
    private router:Router,
    private dialog:MatDialog,
    private emplopyeeService:EmployeeServiceService,
    private activatedRouter:ActivatedRoute){}

ngOnInit(): void {
  this.getParamId();  
}
public getParamId():void{
  this.activatedRouter.paramMap.subscribe(param=>{
    this.paramId=Number(param.get('id'));
    if(this.paramId){
      this.isEdit=true;
      this.getProjectById(this.paramId)
    }
  })
}
public createForm(): FormGroup<ProjectForm> {
  return new FormGroup<ProjectForm>({
    name:new FormControl(null,[Validators.required]),
    description:new FormControl(null,[Validators.required]),
    status:new FormControl(null,[Validators.required]),
    projectEmployee:new FormArray<FormGroup<subMembersForm>>([
      new FormGroup<subMembersForm>({
        id:new FormControl(0),
        name:new FormControl(null)
      })
    ])
  })
}
public addProject():void{
  const { name } = this.myProjectForm.value;
  
  if (!name) {
    alert(" name is required.");
    return;
  }
  console.log(this.ProjectData)
  let departmentExists=false;
  this.ProjectData.forEach(project=>{
    console.log("depatment name",name);
    console.log("name is ",project.name);
    
    if(project.name?.toUpperCase()===name.toUpperCase()){
      departmentExists=true;
      alert("department already exist")
      this.myProjectForm.reset();
    }
    return;
  })
  // console.log();
  this.projectService.AddProject(this.myProjectForm.value).subscribe({
    next: (data) => {
      console.log("data kya h",data);
      this.router.navigateByUrl("/project");
      console.log("data is added",this.myProjectForm.value)
    }
  });
  // console.log(this.myProjectForm.values);
}
public addMembersFunction():void{

}
public openEmployeepopup(): void {
  const dialog = this.dialog.open(EmployeeListComponent, {
    height: '600px',
    width: '1600px',
    enterAnimationDuration:"999ms",
    exitAnimationDuration:"600ms",
    disableClose: true,
  });
  dialog.componentInstance.dialogref=dialog;
  dialog.componentInstance.isActive=true;
  dialog.afterClosed().subscribe({
    next: (data: projectEmployeeitem[] | null) => {
      if (data) {
        const membersArray = this.myProjectForm.controls['projectEmployee'] as FormArray;
        console.log("member array",membersArray);
        
        data.forEach(employee => {
          membersArray.push(new FormGroup<subMembersForm>({
            id: new FormControl(employee.id),
            name: new FormControl(employee.name)
          }));
        });

        this.addedMembers = data.map(employee => employee.name);
        console.log("Selected members:", data);
      }
    },
    error: (err) => console.error("Error closing dialog:", err)
  });
}
public removeMember(i: number): void {
  this.addedMembers.splice(i, 1);
}
public updateEmployee(): void {
  if (this.myProjectForm.valid) {
    console.log("updated data",this.myProjectForm.value);
    this.projectService.updateProject(this.paramId,this.myProjectForm).subscribe({
      next: (data) => {
        // alert("Employee is updated successfully.");
        this.router.navigateByUrl('/project');
        console.log("something went wrong",data);
      },
    });
  } else {
    alert("Form is not valid.");
  }
}
public getProjectById(id:number ):void{
  this.projectService.getProjectById(id).subscribe((data =>{
    console.log("data patched is",data.data)
    this.myProjectForm.patchValue({
      name:data.data.name,
      description:data.data.description,
      status:data.data.status, 
      // projectEmployee:data.data.projectEmployee,     
    })
    const membersArray = this.myProjectForm.controls['projectEmployee'] as FormArray;
    data.data.projectEmployee.forEach((employee: projectEmployeeitem) => {
      membersArray.push(new FormGroup<subMembersForm>({
        id: new FormControl(employee.id),
        name: new FormControl(employee.name)
      }));
    });
    this.addedMembers = data.data.projectEmployee.map(employee => employee.name);
    console.log("data patched is ",this.myProjectForm.value)
  }))
 }
 public addDetail():void {
  let currArr = this.myProjectForm.controls.projectEmployee;
  let moreDetail = new FormGroup<subMembersForm>({
    id: new FormControl(null),
    name: new FormControl('')
  });
  currArr.push(moreDetail)
  console.log(currArr)
}
public remove(i: number):void {
  let remove = this.myProjectForm.controls.projectEmployee;
  remove.removeAt(i);
}
}
