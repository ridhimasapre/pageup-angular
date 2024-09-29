import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { TaskReview,ReviewForm } from '../../model/task-model';
import { Route,ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { TaskServiceService } from '../../Service/task-service.service';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-task-review',
  templateUrl: './add-task-review.component.html',
  styleUrl: './add-task-review.component.css'
})
export class AddTaskReviewComponent implements OnInit{
 public Review!:TaskReview;
 public taskid!:number;
 public projectId!: number; 
 public ReviewForm: FormGroup<ReviewForm> = this.createForm();
 public ReviewObj={
  comments:"",
  reviewerName:"",
  dataTime:"",
}
constructor(public taskservice:TaskServiceService,
  public activatedRoute:ActivatedRoute,
  public dialogRef:MatDialogRef<AddTaskReviewComponent>,
){}
ngOnInit(): void {
  this.ReviewDetails()
  this.fetchProjectId();
}
public ReviewDetails():void{
  this.activatedRoute.paramMap.subscribe(data=>{
    this.taskid=Number(data.get("id"));
    console.log("this is",this.taskid);
  })
}
public fetchProjectId(): void {
  this.activatedRoute.paramMap.subscribe((data) => {
    this.projectId = Number(data.get('projectId')); // Fetch projectId from route
    console.log('Project ID:', this.projectId);

    // Assign project ID to the form control
    this.ReviewForm.get('id')?.setValue(this.projectId);
  });
}
public createForm() {
  return new FormGroup<ReviewForm>({
    id: new FormControl(null, [Validators.required]),
    reviewerName: new FormControl(null, [Validators.required]),
    comments: new FormControl(null, [Validators.required]),
    dataTime: new FormControl(null, [Validators.required]),
  });
}
public addTaskReview():void{
  if(this.ReviewForm.valid){
  this.taskservice.addTaskReview(this.ReviewObj).subscribe({
    next:(response)=>{
      // this.tasklist=response.data;
      console.log("added data",response);
      
    },
    error:(error)=>{
      if(error.status===409){
        // this.showError("employee already found");
        console.log(`employee already exist`);
      }
    }
  })
} 
}
onSubmit() {
  if (this.ReviewForm.valid) {
    this.dialogRef.close(this.ReviewForm.value);
  }
}
}
