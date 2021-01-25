import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DoctorModel } from '../models/doctor.model';
import { DoctorAsignadoModel } from '../models/doctorasignado.model';
import { PacienteModel } from '../models/paciente.model';
import { AsignarDoctorModel } from '../models/asignardoctor.model';

@Injectable({
  providedIn: 'root'
})
export class NexosmedicalService {

  private url = 'https://localhost:44301/api';

  constructor(private http: HttpClient) { }

  getDoctores() {
    return this.http.get(this.url + '/Doctor/getDoctores')
      .pipe(
        map((respuesta: any[]) => {

          return respuesta.map(DoctorX => ({
            Id: DoctorX.id,
            NombreCompleto: DoctorX.nombreCompleto,
            Especialidad: DoctorX.especialidad,
            NumeroCredencial: DoctorX.numeroCredencial,
            HospitalDondeTrabaja: DoctorX.hospitalDondeTrabaja
          }));

        })
      );
  }

  getListaDoctores() {
    return this.http.get(this.url + '/Doctor/getDoctores')
      .pipe(
        map( (respuesta: any[]) => {

          return respuesta.map(ListaDoctores => ({
            Id: ListaDoctores.id,
            NombreCompleto: ListaDoctores.nombreCompleto,
          }));

      })
      );
  }

  getDoctor(id: number): Observable<DoctorModel[]> {
    return this.http.get<DoctorModel[]>(this.url + '/Doctor/getDoctor/' + id);
  }

  agregarDoctor(doctorApp: DoctorModel) {
    console.log(doctorApp);
    return this.http.post(`${this.url}/Doctor/insertarDoctor`, doctorApp);
  }

  asignarDoctor(AsignarDoctorApp: AsignarDoctorModel) {
    console.log(AsignarDoctorApp);
    return this.http.post(`${this.url}/Doctor/asignarDoctor`, AsignarDoctorApp);
  }

  eliminarDoctorApp(Id: number) {
    return this.http.delete(this.url + '/Doctor/eliminarDoctor/' + Id);
  }

  getPaciente(Id: number) {
    return this.http.get(this.url + '/Paciente/getPaciente/' + Id);
  }

  getPacientes() {
    return this.http.get(this.url + '/Paciente/getPacientes')
      .pipe(
        map((respuesta: any[]) => {

          // console.log(respuesta);

          return respuesta.map(PacienteX => ({
            Id: PacienteX.id,
            NombreCompleto: PacienteX.nombreCompleto,
            NumeroSeguroSocial: PacienteX.numeroSeguroSocial,
            CodigoPostal: PacienteX.codigoPostal,
            TelefonoContacto: PacienteX.telefonoContacto
          }));
        })
      );
  }

  getDoctoresAsignados(id: number): Observable<DoctorAsignadoModel[]> {
    return this.http.get<DoctorAsignadoModel[]>(this.url + '/Paciente/getDoctoresAsignados/' + id);
  }

  agregarPaciente(pacienteApp: PacienteModel) {
    console.log(pacienteApp);
    return this.http.post(`${this.url}/Paciente/insertarPaciente`, pacienteApp);
  }

  actualizarPacienteApp(pacienteapp: PacienteModel) {

    // console.log(usuarioapp);
    return this.http.put(`${this.url}/Paciente/actualizarPaciente/${pacienteapp.Id}`, pacienteapp);
  }

  eliminarPacienteApp(Id: number) {
    return this.http.delete(this.url + '/Paciente/eliminarPaciente/' + Id);
  }

}
