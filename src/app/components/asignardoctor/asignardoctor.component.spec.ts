import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignardoctorComponent } from './asignardoctor.component';

describe('AsignardoctorComponent', () => {
  let component: AsignardoctorComponent;
  let fixture: ComponentFixture<AsignardoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignardoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignardoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
