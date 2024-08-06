import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterdDataInfoComponent } from './registerd-data-info.component';

describe('RegisterdDataInfoComponent', () => {
  let component: RegisterdDataInfoComponent;
  let fixture: ComponentFixture<RegisterdDataInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterdDataInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterdDataInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
