import { Component } from '@angular/core';
import { DepartmentServiceService } from '../../../Service/Department/department-service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-department-add-modal',
  templateUrl: './department-add-modal.component.html',
  styleUrl: './department-add-modal.component.css'
})

export class DepartmentAddModalComponent {
  public departments: { name: string }[] = [{ name: "" }];
  public errorMessage: string = '';
  constructor(private dialogRef: MatDialogRef<DepartmentAddModalComponent>){}
  
  addDepartmentField(): void {
    this.departments.push({ name: "" });
  }
  onSubmit(): void {
    const validDepartments = this.departments.filter(dept => dept.name.trim() !== '');
    if (validDepartments.length > 0) {
      this.dialogRef.close(validDepartments);
    } else {
      this.errorMessage = 'Please enter at least one department name.';
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
