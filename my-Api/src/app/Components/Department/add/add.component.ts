import { Component, OnInit } from '@angular/core';
import { DepartmentServiceService } from '../../../Service/department-service.service';
import { FormGroup,FormControl,Validators,AbstractControl,ValidationErrors } from '@angular/forms';
import { department, departmentForm, DepartmentRequest } from '../../../Interface/Department';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit {
  public myDepartmentForm: FormGroup<departmentForm> = this.createForm();
  public UserData: department[] = [];

  constructor(private departmentService: DepartmentServiceService,private router:Router) {}

  ngOnInit(): void {}

  public createForm(): FormGroup<departmentForm> {
    return new FormGroup<departmentForm>({
      name: new FormControl(null, [Validators.required]),
    });
  }
  // public adddepart(): void {

  //   const depratmentReq: DepartmentRequest = {
  //     name: this.myDepartmentForm.controls.name.value as string
  //   }
  //   this.departmentService.AddDepartment(depratmentReq).subscribe({
  //     next: () => this.router.navigateByUrl("/department"),
  //     error: (err) => console.error(err)
  //   });
  // }
  // public adddepat():void {
  //   if (this.myDepartmentForm.valid) {
  
  //     // Check if the product name already exists
  //     const productExists = this.UserData.some(employee => 
  //       (employee.name ?? '').toLowerCase() === (this.myDepartmentForm.value.name??'').toLowerCase()
  //     );
      
  //     if (productExists) {
  //       alert("Product name already exists");
  //       return; // duplicate is found api is not called
  //     }
  
  //   if(this.myDepartmentForm.valid){
  //     this.departmentService.AddDepartment(this.UserData.values).subscribe({
  //       next: (data) => {
  //         console.log(data)
  //         this.router.navigateByUrl("/department");
  //       }
  //     })
  //   }
  // }
  
  //  }
  public adddepartment(): void {
    const { name } = this.myDepartmentForm.value;
  
    if (!name) {
      alert("Category name is required.");
      return;
    }
  
    const departmentExists = this.UserData.some(category => (category.name ?? '').toLowerCase() === name.toLowerCase());
  
    if (departmentExists) {
      alert("Department name already exists.");
      this.myDepartmentForm.reset();
      return;
    }
    this.departmentService.AddDepartment({ name}).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl("/department");
      }
    });
  }
  
  // public adddepart(): void {
  //   const { name } = this.myDepartment.value;
  
  //   if (!name) {
  //     alert("Category name is required.");
  //     return;
  //   }
  //   if (name) {
  //     alert("Category name already exists.");
  //     this.myDepartment.reset();
  //     return;
  //   }
  
  //   this.departmentService.adddepartment({ name}).subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       this.router.navigateByUrl("/department");
  //     },
  //   });
  // }
}