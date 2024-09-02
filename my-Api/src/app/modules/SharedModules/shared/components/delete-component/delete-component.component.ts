import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../model/delete-interface';
import { MatDialogModule,MatDialog } from '@angular/material/dialog';
import { SharedModule } from '../../shared.module';
// import { MatDialogContent } from '@angular/material/dialog';
// import { DeleteServiceService } from '../../services/delete-service.service';
@Component({
  selector: 'app-delete-component',
  templateUrl: './delete-component.component.html',
  styleUrl: './delete-component.component.css'
})
export class DeleteComponentComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData){}

}
