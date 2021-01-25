import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DoctorComponent } from './doctor.component';

describe('DoctorComponent', () => {
  let component: DoctorComponent;
  let fixture: ComponentFixture<DoctorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
