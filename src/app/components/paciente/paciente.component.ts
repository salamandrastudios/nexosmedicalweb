import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { NexosmedicalService } from '../../services/nexosmedical.service';
import { PacienteModel } from '../../models/paciente.model';
import { DoctorAsignadoModel } from '../../models/doctorasignado.model';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  pacienteapp: PacienteModel[] = [];
  doctorasignadoapp: DoctorAsignadoModel[] = [];
  cargando = false;
  medico = false;

  constructor(private router: Router, private route: ActivatedRoute, private servicioNexosMedical: NexosmedicalService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.listarPacientes();
    //this.listarDoctorAsignado();
    
  }

  listarPacientes() {
    this.servicioNexosMedical.getPacientes()
      .subscribe((response: any) => {

        this.pacienteapp = response;
        this.cargando = false;

        // console.log(this.pacienteapp);
        console.log('Lista de pacientes cargada');
      });
  }

  listarDoctorAsignado(idPaciente: number) {
    this.servicioNexosMedical.getDoctoresAsignados(idPaciente)
      .subscribe((response: any) => {

        this.doctorasignadoapp = response;
        //this.cargando = false;

        if(response.length > 0) {
          console.log(this.doctorasignadoapp);
          this.medico=true;
        }
        else {
          Swal.fire(
            'Este paciente',
            'No tiene medico asignado',
            'error'
          )
        }

        // console.log(this.doctorasignadoapp);
        console.log('Lista de doctores cargada');
      });
  }

  eliminarPacienteApp(Id: string, i: number) {
    console.log('eliminar registro');

    Swal.fire({
      title: 'Esta seguro?',
      text: `Esta seguro que desea borrar este paciente`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(result => {

      if (result.value) {
        this.pacienteapp.splice(i, 1);
        this.servicioNexosMedical.eliminarPacienteApp(Number(Id)).subscribe();
      }
    });
  }


}
