import { Component, OnInit } from '@angular/core';
import { DepartmentServiceService } from '../../../Service/department-service.service';
import { FormGroup,FormControl,Validators,AbstractControl,ValidationErrors } from '@angular/forms';
import { department, departmentForm, DepartmentRequest, departmentResponse } from '../../../Interface/Department';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, EmployeeResponse } from '../../../Interface/Employee';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit {
  public myDepartmentForm: FormGroup<departmentForm> = this.createForm();
  public UserData: Employee[] = [];
  public isEdit=  false;
  public paramId!:number;
  public  updatedData:department={
    id:0,
    name:'',
    createdBy:0,
    updatedBy:0,
    createdOn:'',
    updatedOn:'',
    isActive:true,
    totalEntriesCount:0,
   }
  constructor(private departmentService: DepartmentServiceService,private router:Router,private activatedroute:ActivatedRoute) {}

  ngOnInit(): void {
    this.getParamId()
    // this.getId(this.paramId);
  }

  public createForm(): FormGroup<departmentForm> {
    return new FormGroup<departmentForm>({
      name: new FormControl(null, [Validators.required]),
    });
  }
  private getParamId(): void {
    this.activatedroute.paramMap.subscribe(paramMap => {
      this.paramId = Number(paramMap.get('id'));
      if (this.paramId) {
        this.isEdit = true;
        this.getId(this.paramId);
      }
    });
  }
  public adddepartment(): void {
    const { name } = this.myDepartmentForm.value;
  
    if (!name) {
      alert(" name is required.");
      return;
    }
  
    const departmentExists = this.UserData.some(category => (category.name ?? ''));
    console.log(this.UserData)
  
    if (departmentExists) {
      alert("Department name already exists.");
      this.myDepartmentForm.reset();
    console.log(this.UserData)
      return;
    }
    this.departmentService.AddDepartment({ name}).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl("/department");
        // if(){
        //   alert("already exist")
        //   this.myDepartmentForm.reset();
        // }
      }
    });
  }
  public updateDepartment(): void {
    if (this.myDepartmentForm.valid) {
      // const { name } = this.myDepartmentForm.value;

      this.departmentService.updateDepartment(this.paramId,this.UserData).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigateByUrl("/department");
        },
        error: (err) => {
          console.error('Error:', err);
          alert("Failed to update department.");
        }
      });
    } else {
      alert("Form is not valid.");
    }
  }
  // public getDepartmentById(id:number):void{
  //   this.departmentService.getDepartmentById(id).subscribe((data =>{
  //     // this.UserData=this.UserData;
  //     this.myDepartmentForm.patchValue({
  //       name:this.myDepartmentForm.name,
  //     })
  //     console.log("data is",data)
  //     // console.log("data is",this.UserData)
  //   }))
  //  }
  public getId(id:number ):void{
    this.departmentService.getDepartmentById(id).subscribe((data =>{
      this.myDepartmentForm.patchValue({
        name:this.updatedData.name,
      })
      console.log("data is",data)
      console.log("data is",this.updatedData)
    }))
   }
}