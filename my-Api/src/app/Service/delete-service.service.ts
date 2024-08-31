import { Injectable } from '@angular/core';
import { DeleteComponent } from '../Components/Department/delete/delete.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../Interface/Delete';
import { EmployeeDeleteComponent } from '../Components/Employee/employee-delete/employee-delete.component';
import { TaskDeleteComponent } from '../Components/Task/TaskDelete/task-delete/task-delete.component';

@Injectable({
  providedIn: 'root'
})
export class DeleteServiceService {
  constructor(private dialog:MatDialog) { }
  public openConfirmDialog(msg: string): MatDialogRef<DeleteComponent, any>{
    const dialogData: DialogData = {message: msg};
    return this.dialog.open(DeleteComponent, {
      width: '400px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: dialogData
    });
  }
  public openConfirmDialogEmployee(msg: string): MatDialogRef<EmployeeDeleteComponent, any>{
    const dialogData: DialogData = {message: msg};
    return this.dialog.open(EmployeeDeleteComponent, {
      width: '400px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: dialogData
    });
  }
  public openConfirmDialogTask(msg: string): MatDialogRef<TaskDeleteComponent, any>{
    const dialogData: DialogData = {message: msg};
    return this.dialog.open(EmployeeDeleteComponent, {
      width: '400px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: dialogData
    });
  }
  public AddConfirmDialogTask(msg: string): MatDialogRef<TaskDeleteComponent, any>{
    const dialogData: DialogData = {message: msg};
    return this.dialog.open(EmployeeDeleteComponent, {
      width: '400px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: dialogData
    });
  }
}
