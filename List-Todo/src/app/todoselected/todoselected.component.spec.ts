import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoselectedComponent } from './todoselected.component';

describe('TodoselectedComponent', () => {
  let component: TodoselectedComponent;
  let fixture: ComponentFixture<TodoselectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoselectedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodoselectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
