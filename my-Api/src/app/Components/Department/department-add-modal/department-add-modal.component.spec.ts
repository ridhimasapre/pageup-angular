import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentAddModalComponent } from './department-add-modal.component';

describe('DepartmentAddModalComponent', () => {
  let component: DepartmentAddModalComponent;
  let fixture: ComponentFixture<DepartmentAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepartmentAddModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartmentAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
