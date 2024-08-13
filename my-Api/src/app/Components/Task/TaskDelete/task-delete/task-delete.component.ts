import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { DialogData } from '../../../Interface/Delete';
import { DialogData } from '../../../../Interface/Delete';
@Component({
  selector: 'app-task-delete',
  templateUrl: './task-delete.component.html',
  styleUrl: './task-delete.component.css'
})
export class TaskDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData){}

}
