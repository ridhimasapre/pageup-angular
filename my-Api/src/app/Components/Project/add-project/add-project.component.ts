import { Component, OnInit } from '@angular/core';
import { Project, ProjectForm, subMembersForm } from '../../../Interface/Project';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup,FormControl,Validators, FormArray } from '@angular/forms';
import { ProjectService } from '../../../Service/Project/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent implements OnInit{
  public ProjectData:Project[]=[];
  public isEdit=  false;
  public paramId!:number;
  public myProjectForm: FormGroup<ProjectForm> = this.createForm();
  constructor(private projectService:ProjectService,private router:Router,private activatedRouter:ActivatedRoute){}

ngOnInit(): void {
  this.getParamId();
  
}
public getParamId():void{
  this.activatedRouter.paramMap.subscribe(param=>{
    this.paramId=Number(param.get('id'))??'';
    if(this.paramId){
      this.isEdit=true;
      this.getProjectById(this.paramId)
      // this.getEmployeeById(this.paramId)
      // this.getEmployeeByDepartment()
    }
  })
}
public createForm(): FormGroup<ProjectForm> {
  return new FormGroup<ProjectForm>({
    name:new FormControl(null,[Validators.required]),
    description:new FormControl(null,[Validators.required]),
    status:new FormControl(null,[Validators.required]),
    // member:new FormControl(null,[Validators.required])
    projectEmployee:new FormArray<FormGroup<subMembersForm>>([
      new FormGroup<subMembersForm>({
        id:new FormControl(0),
        name:new FormControl(null)
      })
    ])
  })
}
public addProject():void{
  // const { name } = this.myProjectForm.value;
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
  this.myProjectForm.value.status=0;
  
  this.projectService.AddProject(this.myProjectForm.value).subscribe({
    next: (data) => {
      console.log("data kya h",data);
      this.router.navigateByUrl("/project");
      console.log("data is added",this.myProjectForm.value)
    }
  });
  // console.log(this.myProjectForm.values);
  // console.log(this.myProjectForm.value);
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
      // error: (err) => {
      //   console.error('Error:', err);
      //   alert("Failed to update employee.");
      // }
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
      projectEmployee:data.data.projectEmployee,     
    })
    console.log("data patched is 1",this.myProjectForm.value)
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
  let arr = this.myProjectForm.controls.projectEmployee;
  arr.removeAt(i);
}
}
// 
