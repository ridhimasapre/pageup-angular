import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeResponse, EmployeeRole } from '../../../Interface/Employee';
import { EmployeeService } from '../../../Service/employee/employee.service';
import { DepartmentServiceService } from '../../../Service/Department/department-service.service';
import { department, departmentResponse, DepartmentPagenatorRequest } from '../../../Interface/Department';
import { EmployeeForm, EmployeeResponseById } from '../../../Interface/Employee';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})

export class AddEmployeeComponent implements OnInit {
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
  public totalEntriesCount: number = 0;

  constructor(private employeeService: EmployeeService, private router: Router, private activatedRoute: ActivatedRoute, private deparmentService: DepartmentServiceService) { }
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
    // this.getEmployeeByDepartment(this.paramId);
    // this.getEmployeeById(this.paramId)

  }
  public getParamId(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      this.paramId = Number(param.get('id')) ?? '';
      if (this.paramId) {
        this.isEdit = true;
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
      name: new FormControl('', [Validators.required]),
      salary: new FormControl(null, [Validators.required]),
      departmentId: new FormControl(null, [Validators.required]),
      adminId: new FormControl(null, [Validators.required]),
      role: new FormControl(null, [Validators.required]),
    });
  }


  // public addEmployee(): void {
  //   const { name } = this.myEmployeeForm.value;

  //   if (!name) {
  //     alert(" name is required.");
  //     return;
  //   }else

  //   console.log(this.employeeList)
  //   let departmentExists=false;
  //   this.employeeList.forEach(department=>{
  //     console.log("depatment name",name);
  //     console.log("name is ",department.name);

  //     if(department.name?.toUpperCase()===name.toUpperCase()){
  //       departmentExists=true;

  //       alert("department already exist")
  //       this.myEmployeeForm.reset();
  //     }
  //     return;
  //   })
  // }

  //   this.employeeService.AddEmployee({
  //     name,
  //     username:"",
  //     password: "",
  //     salary: null,
  //     departmentId: null,
  //     adminId: null,
  //     role: null
  //   }).subscribe({
  //     next: (data) => {
  //       // datathis.myEmployeeForm=
  //       console.log("data is",data);
  //       this.router.navigateByUrl("/department");
  //     }
  //   });
  // }

  public addEmployee(): void {
    console.log(this.myEmployeeForm.value)
    if (this.myEmployeeForm.value.name && this.myEmployeeForm.value.salary && this.myEmployeeForm.value.username
      && this.myEmployeeForm.value.password) {
      const body = {
        username: this.myEmployeeForm.value.username,
        password: this.myEmployeeForm.value.password,
        name: this.myEmployeeForm.value.name,
        salary: this.myEmployeeForm.value.salary,
        departmentId: this.myEmployeeForm.value.departmentId,
        adminId: this.myEmployeeForm.value.adminId,
        role: this.myEmployeeForm.value.role
      };

      let departmentExists = false;
      this.employeeList.forEach(department => {
        console.log("depatment name", name);
        console.log("name is ", department.name);
        if (department.name?.toUpperCase() === name) {
          departmentExists = true;
          alert("department already exist")
          this.myEmployeeForm.reset();
        }
        return;
      })

      if (this.myEmployeeForm.valid) {
        this.employeeService.AddEmployee(body).subscribe({
          next: (data) => {
            console.log("whole data", data);
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
    } else {
      this.SelectedEmployeeList = [];
    }
  }

  public updateEmployee(): void {
    if (this.myEmployeeForm.valid) {
      this.employeeService.updatedEmployee(this.myEmployeeForm.value, this.paramId).subscribe({
        next: () => {
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
    this.employeeService.EmployeeById(this.paramId).subscribe((res: EmployeeResponseById) => {
      const employeeData = res.data;
      if (employeeData) {
        this.myEmployeeForm.patchValue({
          name: employeeData.name,
          salary: employeeData.salary,
          departmentId: employeeData.departmentId,
          adminId: employeeData.adminId,
          role: employeeData.role,
        });
        console.log("employee ka data hai ye to",employeeData);
        // if (employeeData.departmentId) {
        //   this.employeeService.getEmployeesByDepartment(employeeData.departmentId).subscribe((res: EmployeeResponse) => {
        //     this.employeeList = res.data;
        //   });
        // }
      }
    });
  }
}