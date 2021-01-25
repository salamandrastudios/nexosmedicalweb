import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingdoctorComponent } from './settingdoctor.component';

describe('SettingdoctorComponent', () => {
  let component: SettingdoctorComponent;
  let fixture: ComponentFixture<SettingdoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingdoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingdoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
