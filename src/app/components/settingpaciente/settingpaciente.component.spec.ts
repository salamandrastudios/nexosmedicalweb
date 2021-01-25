import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingpacienteComponent } from './settingpaciente.component';

describe('SettingpacienteComponent', () => {
  let component: SettingpacienteComponent;
  let fixture: ComponentFixture<SettingpacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingpacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingpacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
