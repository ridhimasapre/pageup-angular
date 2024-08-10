import { Component, OnInit } from '@angular/core';
import { Employee ,EmployeeResponse,EmployeeRole} from '../../../Interface/Employee';
import { EmployeeService } from '../../../Service/employee/employee.service';
import { DepartmentServiceService } from '../../../Service/department-service.service';
import { department,departmentResponse } from '../../../Interface/Department';
import { EmployeeDeleteResponse,EmployeeForm,AddEmployeeRequest,EmployeeResponseById,AddEmployeeResponse} from '../../../Interface/Employee';
import { Router ,ActivatedRoute} from '@angular/router';
import { FormGroup,FormControl,Validators,AbstractControl,ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})

export class AddEmployeeComponent implements OnInit{
  public departmentList: department[]=[]; 
  public employeeList:Employee[]=[];
  public filterdEmployeeList:Employee[]=[];
  public isEdit=  false;
  public paramId!:number;
  public myEmployeeForm: FormGroup<EmployeeForm> = this.createForm();


constructor(private employeeService:EmployeeService,private router:Router,private activatedRoute:ActivatedRoute,private deparmentService:DepartmentServiceService){}
ngOnInit(): void {
  // this.activatedRoute.paramMap.subscribe(paramMap => {
  //   console.log(paramMap);
  //   this.paramId = Number(paramMap.get('id'));
  //   if(this.paramId){
  //     this.isEdit = true;
  //     // this.getId();
  //     this.getEmployeeById(this.paramId);
  //   }
  // });
  this.getParamId();
  this.getDepartment();
  // this.getEmployeeById(this.paramId)

}
public getParamId():void{
  this.activatedRoute.paramMap.subscribe(param=>{
    this.paramId=Number(param.get('id'))??'';
    if(this.paramId){
      this.isEdit=true;
      this.getEmployeeById()
      // this.getEmployeeById(this.paramId)
      // this.getEmployeeByDepartment()
    }
  })
}

public createForm() {
  return new FormGroup<EmployeeForm>({
    username: new FormControl('', [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    name: new FormControl('',[Validators.required]),
    salary:new FormControl(null,[Validators.required]),
    departmentId:new FormControl(null,[Validators.required]),
    adminId: new FormControl(null,[Validators.required]),
    role: new FormControl(null,[Validators.required]),
  });
}

public addEmployee(): void {
  console.log(this.myEmployeeForm.value)
  if (this.myEmployeeForm.value.name && this.myEmployeeForm.value.salary && this.myEmployeeForm.value.username
    && this.myEmployeeForm.value.password)
  {
     const body = {
      username: this.myEmployeeForm.value.username,
      password: this.myEmployeeForm.value.password,
      name: this.myEmployeeForm.value.name,
      salary: this.myEmployeeForm.value.salary,
      departmentId: this.myEmployeeForm.value.departmentId,
      adminId: this.myEmployeeForm.value.adminId,
      role: this.myEmployeeForm.value.role
    };

    const EmployeeExists = this.employeeList.some(employee => (employee.name ?? ''));
  if (EmployeeExists) {
    alert("Name already exists.");
    this.myEmployeeForm.reset();
    return;
  }
    if (this.myEmployeeForm.valid) {
      this.employeeService.AddEmployee(body).subscribe({
        next: (data: AddEmployeeResponse) => {
          this.router.navigateByUrl("/employee");
        },
        error: (err) => {
          console.error('Error:', err);
          alert("Failed to add employee.");
        }
      });
    } 
  }
}

public getDepartment():void{
  this.deparmentService.getDepartmentList().subscribe((res=>{
    this.departmentList=res.data
    console.log("department",res);
    
  }))
}
public getEmployeeByDepartment(id: number): void {
  this.employeeService.getEmployeesByDepartment(id).subscribe((data=>{
    this.employeeList=data.data
    console.log("admin ka data",data);
  }))
}
public onDepartmentChange(): void {
  const departmentId = this.myEmployeeForm.get('departmentId')?.value;
  if (departmentId) {
    this.getEmployeeByDepartment(departmentId);
  } else {
    this.filterdEmployeeList = [];
  }
}

public updateEmployee(): void {
  if (this.myEmployeeForm.valid) {
    this.employeeService.updatedEmployee(this.myEmployeeForm.value, this.paramId).subscribe({
      next: () => {
        // alert("Employee is updated successfully.");
        this.router.navigateByUrl('/employee');
      },
      error: (err) => {
        console.error('Error:', err);
        alert("Failed to update employee.");
      }
    });
  } else {
    alert("Form is not valid.");
  }
}
public getEmployeeById(): void {
  this.employeeService.EmployeeById((this.paramId)).subscribe((res: EmployeeResponseById) => {
    const employeeData = res.data;
    if (employeeData.departmentId) {
      this.employeeService.getEmployeesByDepartment(employeeData.departmentId).subscribe((res: EmployeeResponse) => {
        this.employeeList = res.data;
        this.myEmployeeForm.patchValue({
          username: null,
          password: null,
          name: employeeData.name,
          salary: employeeData.salary,
          departmentId: employeeData.departmentId,
          adminId: employeeData.adminId,
          role: employeeData.role
        });
      });      
    }
  });
}
}
// public getEmployeeById(id: number): void {
//   this.employeeService.EmployeeById(this.paramId).subscribe((data:EmployeeResponseById )=>{
//     this.employeeList=data.data
//     this.myEmployeeForm.patchValue({
//       username: null,
//       password: null,
//       name: data.name,
//       salary: data.salary,
//       departmentId: data.departmentId,
//       adminId: data.adminId,
//       role: data.role,
//     });
// console.log("data is",data);

//   })
// }


//  public updateEmployee():void{
//   this.employeeService.updatedEmployee(this.myEmployeeForm.value,this.paramId).subscribe(()=>{
    
//     alert("Your Product is Updated");
//     // this.myProduct.reset();
//   });
//   this.router.navigateByUrl('/product');
//  }
// public getId( id:string | null):void{
//   this.employeeService.EmployeeById(this.paramId).subscribe((data =>{
//     this.employeeuser=data;
//     console.log("data is",this.employeeuser)
//     this.myEmployeeForm.patchValue({
//     name:this.employeeuser.username,
//     :this.employeeuser.password,
//     departmentId:this.employeeuser.departmentId,
//     departmentName:this.employeeuser.departmentName,
//     managerId:this.employeeuser.managerId,
//     managerName:this.employeeuser.managerId,
//     salary:this.employeeuser.salary,
//     })
//     console.log("patchvalue",this.employeeuser)
//   }))
//  }




