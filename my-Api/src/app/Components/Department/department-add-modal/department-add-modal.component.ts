import { Component } from '@angular/core';
import { DepartmentServiceService } from '../../../Service/Department/department-service.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-department-add-modal',
  templateUrl: './department-add-modal.component.html',
  styleUrl: './department-add-modal.component.css'
})
export class DepartmentAddModalComponent {

  public department = {
    name: "",
  };
  public departmentName: string = '';
  public errorMessage: string = '';
  constructor(private departmentservice:DepartmentServiceService,
    private dialogRef:DialogRef
  ){}
  
  onCancel(): void {
    this.dialogRef.close();
  }

}
