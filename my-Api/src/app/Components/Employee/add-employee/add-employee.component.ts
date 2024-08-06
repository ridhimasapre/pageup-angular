import { Component, OnInit } from '@angular/core';
import { Employee ,EmployeeRole} from '../../../Interface/Employee';
import { EmployeeService } from '../../../Service/employee/employee.service';
import { DepartmentServiceService } from '../../../Service/department-service.service';
import { department,departmentResponse } from '../../../Interface/Department';
import { EmployeeDeleteResponse,EmployeeForm,AddEmployeeRequest,AddEmployeeResponse} from '../../../Interface/Employee';
import { Router ,ActivatedRoute} from '@angular/router';
import { FormGroup,FormControl,Validators,AbstractControl,ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})

export class AddEmployeeComponent implements OnInit{
  public EmployeeData:Employee[]=[];
  // public DepartmentData:department[]=[];
  public departmentList: department[]=[]; //list for dropdown
  public adminNameList: department[]=[];
  public employeeList:Employee[]=[];
  public isEdit=  false;
  public paramId!:number;
  public myEmployeeForm: FormGroup<EmployeeForm> = this.createForm();
// public employeeuser:AddEmployeeRequest={
//   name: '',
//   salary: 0,
//   departmentId:0,
//   managerId: 0,
//   role: 0

// }

constructor(private employeeService:EmployeeService,private router:Router,private activatedRoute:ActivatedRoute,private deparmentService:DepartmentServiceService){}
ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe(paramMap => {
    console.log(paramMap);
    this.paramId = Number(paramMap.get('id'));
    if(this.paramId){
      this.isEdit = true;
      // this.getId();
    }
  });
}

public createForm() {
  return new FormGroup<EmployeeForm>({
    name: new FormControl('', [Validators.required]),
    salary: new FormControl(null, [Validators.required]),
    departmentId: new FormControl(null),
    departmentName:new FormControl(null),
    managerName:new FormControl(null),
    managerId: new FormControl(null),
    role: new FormControl(null),
  });
}

// public addEmployee():void {
  
//   // const {name}=this.myEmployeeForm.value
//     const productExists = this.employeeList.some(employee => 
//       (employee.name ?? '').toLowerCase() === (this.myEmployeeForm.value.name??'').toLowerCase()
//     );
    
//     if (productExists) {
//       alert("Product name already exists.");
//       return; // duplicate is found api is not called
//     }

//   if(this.myEmployeeForm.valid){
//     console.log(this.myEmployeeForm.value);
//     this.employeeService.AddEmployee().subscribe({
//       next:(data)=>{
//         this.router.navigateByUrl("/employee")
//       }
//   })
    
// public addEmployee(): void {
//   const employeeExists = this.employeeList.some(employee => 
//     (employee.name ?? '').toLowerCase() === (this.myEmployeeForm.value.name ?? '').toLowerCase()
//   );
  
//   if (employeeExists) {
//     alert("Employee name already exists.");
//     return; 
//   }

//   if (this.myEmployeeForm.valid) {
//     console.log(this.myEmployeeForm.value);

//     this.employeeService.AddEmployee(this.EmployeeData.value).subscribe({
//       next: (data: AddEmployeeResponse) => {
//         console.log(data);
//         this.router.navigateByUrl("/employee");
//       },
//       error: (err) => {
//         console.error('Error adding employee:', err);
//         alert("Failed to add employee.");
//       }
//     });
//   } else {
//     alert("Form is not valid.");
//   }
// }
    // this.employeeService.AddEmployee(this.myEmployeeForm).subscribe({
    //   next: (data) => {
    //     console.log(data)
    //     this.router.navigateByUrl("/employee");
    //   }
    // })
  

 public updateEmployee():void{
  this.employeeService.updatedEmployee(this.myEmployeeForm.value,this.paramId).subscribe(()=>{
    
    alert("Your Product is Updated");
    // this.myProduct.reset();
  });
  this.router.navigateByUrl('/product');
}
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



}

