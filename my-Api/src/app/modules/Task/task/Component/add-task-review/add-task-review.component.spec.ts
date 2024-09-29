import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskReviewComponent } from './add-task-review.component';

describe('AddTaskReviewComponent', () => {
  let component: AddTaskReviewComponent;
  let fixture: ComponentFixture<AddTaskReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTaskReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTaskReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
