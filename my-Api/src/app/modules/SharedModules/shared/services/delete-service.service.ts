import { Injectable } from '@angular/core';
import { DeleteComponentComponent } from '../components/delete-component/delete-component.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../model/delete-interface';

@Injectable({
  providedIn: 'root'
})
export class DeleteServiceService {

  constructor(private dialog:MatDialog) { }
  public openConfirmDialog(msg: string): MatDialogRef<DeleteComponentComponent, any>{
    const dialogData: DialogData = {message: msg};
    return this.dialog.open(DeleteComponentComponent, {
      width: '400px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: dialogData
    });
  }
  // public openConfirmDialogEmployee(msg: string): MatDialogRef<EmployeeDeleteComponent, any>{
  //   const dialogData: DialogData = {message: msg};
  //   return this.dialog.open(EmployeeDeleteComponent, {
  //     width: '400px',
  //     panelClass: 'confirm-dialog-container',
  //     disableClose: true,
  //     data: dialogData
  //   });
  // }
  // public openConfirmDialogTask(msg: string): MatDialogRef<TaskDeleteComponent, any>{
  //   const dialogData: DialogData = {message: msg};
  //   return this.dialog.open(EmployeeDeleteComponent, {
  //     width: '400px',
  //     panelClass: 'confirm-dialog-container',
  //     disableClose: true,
  //     data: dialogData
  //   });
  // }
  // public AddConfirmDialogTask(msg: string): MatDialogRef<TaskDeleteComponent, any>{
  //   const dialogData: DialogData = {message: msg};
  //   return this.dialog.open(EmployeeDeleteComponent, {
  //     width: '400px',
  //     panelClass: 'confirm-dialog-container',
  //     disableClose: true,
  //     data: dialogData
  //   });
  // }
}
