import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentSecComponent } from './department-sec.component';

describe('DepartmentSecComponent', () => {
  let component: DepartmentSecComponent;
  let fixture: ComponentFixture<DepartmentSecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepartmentSecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartmentSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
