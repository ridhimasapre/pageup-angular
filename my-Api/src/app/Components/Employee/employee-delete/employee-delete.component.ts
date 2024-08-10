import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../../Interface/Delete';
@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrl: './employee-delete.component.css'
})
export class EmployeeDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData){}

}
