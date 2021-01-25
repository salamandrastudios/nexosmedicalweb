import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './components/layouts/default/default.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { PacienteComponent } from './components/paciente/paciente.component';
import { SettingdoctorComponent } from './components/settingdoctor/settingdoctor.component';
import { SettingpacienteComponent } from './components/settingpaciente/settingpaciente.component';
import { AsignardoctorComponent } from './components/asignardoctor/asignardoctor.component';

const routes: Routes = [
  { path: '', component: DefaultComponent,
  children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'doctor', component: DoctorComponent },
    { path: 'paciente', component: PacienteComponent},
    { path: 'settingdoctor/:id', component: SettingdoctorComponent },
    { path: 'settingpaciente/:id', component: SettingpacienteComponent },
    { path: 'asignardoctor/:id', component: AsignardoctorComponent },

    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  ]},

  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
