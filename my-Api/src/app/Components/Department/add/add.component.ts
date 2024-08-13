import { Component, OnInit } from '@angular/core';
import { DepartmentServiceService } from '../../../Service/Department/department-service.service';
import { FormGroup,FormControl,Validators,ValidationErrors } from '@angular/forms';
import { department, departmentForm, DepartmentRequest, departmentResponse ,DepartmentPagenatorRequest,DepartmentPagenatorResponse} from '../../../Interface/Department';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, EmployeeResponse } from '../../../Interface/Employee';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit {
  public myDepartmentForm: FormGroup<departmentForm> = this.createForm();
  public UserData: department[] = [];
  public isEdit=  false;
  public paramId!:number;
  public  updatedData:department={
    id:0,
    name:'',
    createdBy_Name:'',
    createdOn:'',
    totalEntriesCount:0,
   }
   public filterObj ={
    filterOn:'',
    filterQuery:'',
    sortBy : '',
    isAscending: true,
    pageNumber: -1,
    pageSize: -1
  }
  constructor(private departmentService: DepartmentServiceService,
    private router:Router,
    private activatedroute:ActivatedRoute) {}

  ngOnInit(): void {
    // this.getdepart()
    // this.getPagination();
    this.getParamId()
  }
  // public getdepart(): void{
  //     this.departmentService.getDepartmentList().subscribe({
  //       next: (data: departmentResponse)=>{
  //         console.log(data);
  //         this.UserData = data.data;
  //       },
       
  //     })
  //   }  
    // public getAllDepartment(): void{
    //   this.departmentService.PaginationDepartment().subscribe({
    //     next: (data: departmentResponse)=>{
    //       console.log(data);
    //       this.UserData = data.data;
    //     },
    //   })
    // }
    // public getAllDep():void{
    //   this.departmentService.PaginationDepartment().subscribe((da))
    // }
  public createForm(): FormGroup<departmentForm> {
    return new FormGroup<departmentForm>({
      id:new FormControl(null),
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
    }else

    console.log(this.UserData)
    let departmentExists=false;
    this.UserData.forEach(department=>{
      console.log("depatment name",name);
      console.log("name is ",department.name);
      
      if(department.name?.toUpperCase()===name.toUpperCase()){
        departmentExists=true;
        
        alert("department already exist")
        this.myDepartmentForm.reset();
        
      }
      return;
    })

    this.departmentService.AddDepartment({ name}).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl("/department");
      }
    });
  }
  public updateDepartment(): void {
    if (this.myDepartmentForm.valid) {
      // const { name } = this.myDepartmentForm.value;

      this.departmentService.updateDepartment(this.paramId,this.myDepartmentForm.value).subscribe({
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
      // console.log(`data is ${data}`);
      
      this.myDepartmentForm.patchValue({
        id:data.data.id,
        name:data.data.name,
        
      })
      console.log("data patched is",data.data)
      // console.log("data is",this.updatedData)
    }))
   }
}