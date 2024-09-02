import { Component,OnInit } from '@angular/core';
import { Employee, EmployeeResponse, EmployeeRole } from '../../Model/employee-model';
import { EmployeeServiceService } from '../../Service/employee-service.service';
import { department, departmentResponse, DepartmentPagenatorRequest } from '../../../Department/department-module/Model/department.model';
import { DepartmentServiceService } from '../../../Department/department-module/Service/department-service.service';
import {EmployeeForm, AddEmployeeRequest,EmployeeResponseById} from '../../Model/employee-model'
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.css'
})
export class EmployeeAddComponent implements OnInit{
  public departmentList: department[] = [];
  public employeeList: Employee[] = [];
  public SelectedEmployeeList: Employee[] = [];
  public isEdit = false;
  public paramId!: number;
  public myEmployeeForm: FormGroup<EmployeeForm> = this.createForm();
  public EmployeeFilterObj = {
    filterOn: "",
    filterQuery: "",
    sortBy: "",
    isAscending: true,
    pageNumber: -1,
    pageSize: -1
  }
  private info ={
    timeOut: 10000, 
    tapToDismiss: true,
    closeButton: true
}
  public totalEntriesCount: number = 0;

  constructor(private employeeService: EmployeeServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private deparmentService: DepartmentServiceService,
   private toastr:ToastrService) { }
  ngOnInit(): void {
    this.getParamId();
    this.getDepartment();    
    this.getEmployeeByDepartment(this.paramId)
     // Only fetch employee data for editing
     if (this.isEdit) {
      this.getEmployeeById();
    }
  
  }
  public getParamId(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      this.paramId = Number(param.get('id')) ?? '';
      if (this.paramId) {
        this.isEdit = true;
      }
    })
  }

  public createForm() {
    return new FormGroup<EmployeeForm>({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      salary: new FormControl(null, [Validators.required]),
      departmentId: new FormControl<number | null>(null, [Validators.required]),
      adminId: new FormControl<number | null>(null, [Validators.required]),
      role: new FormControl<EmployeeRole | null>(null, [Validators.required]),
    });
  }
  public addEmployee(): void {
    console.log("console log stringdata",this.myEmployeeForm.value)
    if (this.myEmployeeForm.value.name && this.myEmployeeForm.value.salary && this.myEmployeeForm.value.userName
      && this.myEmployeeForm.value.password 
    )
     {
      const body = {
        userName: this.myEmployeeForm.value.userName,
        password: this.myEmployeeForm.value.password,
        name: this.myEmployeeForm.value.name,
        salary: this.myEmployeeForm.value.salary,
        departmentId: Number(this.myEmployeeForm.value.departmentId),
        adminId: Number(this.myEmployeeForm.value.adminId),
        role: Number(this.myEmployeeForm.value.role) 
      };
      console.log("added data",body)
      this.employeeService.AddEmployee(body).subscribe({
        next:()=>{
          this.showSuccess();
          this.router.navigateByUrl("/employee")
        },
        error:(error)=>{
          if(error.status===409){
            this.showError("employee already found");
            alert(`employee already exist`);
          }
        }
      })
    } 
  }
  public getDepartment(): void {
    this.deparmentService.PaginationDepartment(this.EmployeeFilterObj).subscribe((res => {
      this.departmentList = res.data
      console.log("department", res);
    }))
  }
  public getEmployeeByDepartment(departmentId: number): void {
    this.employeeService.getEmployeesByDepartment(departmentId).subscribe((data => {
      this.SelectedEmployeeList = data.data
      console.log("admin ka data", data.data);
    }))
  }
  public onDepartmentChange(): void {
    console.log("department with employee id");
    const departmentId = this.myEmployeeForm.get('departmentId')?.value;
    if (departmentId) {
      this.getEmployeeByDepartment(departmentId);
    }
  }

public onAdminChange():void{
  const adminId=this.myEmployeeForm.get("adminId")?.value;
}
  public updateEmployee(): void {
    console.log("updated data",this.myEmployeeForm.value);
    if (this.myEmployeeForm.value.name && this.myEmployeeForm.value.salary && this.paramId, this.myEmployeeForm.value.userName && this.myEmployeeForm.value.password) {
      const body = {
        userName:this.myEmployeeForm.value.userName,
        password:this.myEmployeeForm.value.password,
        name: this.myEmployeeForm.value.name,
        salary: this.myEmployeeForm.value.salary,
        departmentId: Number(this.myEmployeeForm.value.departmentId),
        adminId: Number(this.myEmployeeForm.value.adminId),
        role: Number(this.myEmployeeForm.value.role)
      };
      this.employeeService.updatedEmployee(body,this.paramId).subscribe(response => {
        // alert('Employee updated successfully');
        this.router.navigate(['/employee']);
      });
    }
  }
  public getEmployeeById(): void {
    this.employeeService.EmployeeById(this.paramId).subscribe((res: EmployeeResponseById) => {
      const employeeData = res.data;
      console.log(employeeData);
      if (employeeData) {
        console.log("patch value",this.myEmployeeForm.value);
        this.myEmployeeForm.patchValue({
          userName:employeeData.userName,
          password:employeeData.password,
          name: employeeData.name,
          salary: employeeData.salary,
          departmentId:Number(employeeData.departmentId),
          adminId:Number(employeeData.adminId),
          role:Number(employeeData.role),          
        });
      }
      if(employeeData.departmentId!=null){
      this.getEmployeeByDepartment(employeeData.departmentId);
      this.myEmployeeForm.value.adminId = employeeData.adminId;
      console.log("admin id",employeeData.adminName); 
      }
    });
  }
  public showSuccess() {
    this.toastr.success('Data saved successfully!', 'Success');
  }
  // showError() {
  //   this.toastr.error('An error occurred.', 'Error');
  // }
  public showError(msg:string) {
    this.toastr.error(msg,"",this.info);
  }
  public showInfo() {
    this.toastr.info('This is an informational message.', 'Information');
  }

  public showWarning() {
    this.toastr.warning('Warning: Check this out!', 'Warning');
  }
}
