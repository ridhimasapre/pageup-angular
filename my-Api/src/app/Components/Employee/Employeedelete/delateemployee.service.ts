import { Injectable } from '@angular/core';
// import { DeleteComponent } from '../../Components/Employee/Delete/delete/employeedelete.component';
import { DeleteComponent } from '../../Department/delete/delete.component';
import { DialogData } from '../../../Interface/Delete';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
@Injectable({
  providedIn: 'root'
})
export class DelateemployeeService {

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

}
