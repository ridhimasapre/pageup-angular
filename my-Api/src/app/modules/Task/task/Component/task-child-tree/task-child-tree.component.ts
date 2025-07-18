import { Component, OnDestroy, OnInit } from '@angular/core';
import { Input,Output,EventEmitter } from '@angular/core';
import { TaskServiceService } from '../../Service/task-service.service';
import { TaskById,items } from '../../model/task-model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-child-tree',
  templateUrl: './task-child-tree.component.html',
  styleUrl: './task-child-tree.component.css'
})
export class TaskChildTreeComponent implements OnDestroy{
  @Input() items: items[] = [];
  @Input() projectId!: number;
  @Input() task:any;
  @Output() taskUpdated = new EventEmitter<void>();
  public totalEntriesCount: number = 0;
  public paramId: string | null = null;
  private subscriptions: Subscription = new Subscription();
  constructor(private taskService: TaskServiceService,
    private activatedroute:ActivatedRoute,
    private router:Router
  ) {
    this.getParamId()
  }
ngOnDestroy(): void {
  this.subscriptions.unsubscribe();  
}
private getParamId(): void {
  this.subscriptions.add(
    this.activatedroute.params.subscribe((params) => {
      this.paramId = params['id'];
      console.log("paramid",this.paramId);
      console.log("arr",this.items);
      
      
    })
  );
}
  public getTaskTypeLabel(taskType: number): string {
    switch (taskType) {
      case 0: return 'Epic';
      case 1: return 'Feature';
      case 2: return 'User Story';
      case 3: return 'Task';
      case 4: return 'Bug';
      default: return '';
    }
  }
  public toggle(item: items) {
    item.isExpanded = !item.isExpanded;
    if (item.isExpanded && !item.childrenLoaded) {
      this.loadChildren(item);
    }
  }
  public hasChildren(item: items): boolean {
    return item.children ? item.children.length > 0 : false;
  }
  public loadChildren(item:any) {
    this.taskService.getChildById(item.id).subscribe((children) => {
      console.log('Children data:', children); 
      item.children = children;
      item.childrenLoaded = true;
      this.taskUpdated.emit();
    });
  }
  public addTask(id: number, taskType: number, taskName: string) {
  }

  public viewTask(id: number) {
  }

  public editTask(id: number) {
    this.router.navigate([`/task/view/${id}`]);
  }
}
