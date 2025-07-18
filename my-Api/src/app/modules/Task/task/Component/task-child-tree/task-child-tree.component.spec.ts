import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskChildTreeComponent } from './task-child-tree.component';

describe('TaskChildTreeComponent', () => {
  let component: TaskChildTreeComponent;
  let fixture: ComponentFixture<TaskChildTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskChildTreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskChildTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
