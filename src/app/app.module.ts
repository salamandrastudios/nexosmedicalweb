import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DefaultModule } from './components/layouts/default/default.module';
import { DoctorComponent } from './components/doctor/doctor.component';
import { PacienteComponent } from './components/paciente/paciente.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingdoctorComponent } from './components/settingdoctor/settingdoctor.component';
import { SettingpacienteComponent } from './components/settingpaciente/settingpaciente.component';
import { AsignardoctorComponent } from './components/asignardoctor/asignardoctor.component';

@NgModule({
  declarations: [
    AppComponent,
    DoctorComponent,
    PacienteComponent,
    PagenotfoundComponent,
    DashboardComponent,
    SettingdoctorComponent,
    SettingpacienteComponent,
    AsignardoctorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DefaultModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
