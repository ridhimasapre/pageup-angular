import { Component,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { addmodaldepartment } from '../../Model/department.model';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrl: './department-add.component.css'
})
export class DepartmentAddComponent {
  // public departments: { name: string }[] = [{ name: "" }];
  public departments:addmodaldepartment[]=[]
  public errorMessage: string = '';
  constructor(private dialogRef: MatDialogRef<DepartmentAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: addmodaldepartment
  ){}
  
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
