import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { department, departmentResponse } from '../Interface/Department';
// import { environment } from '../../environments/environment';
import { DeleteComponent } from '../Components/Department/delete/delete.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../Interface/Delete';

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
}
