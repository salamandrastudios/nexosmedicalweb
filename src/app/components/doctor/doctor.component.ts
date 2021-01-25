import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { NexosmedicalService } from '../../services/nexosmedical.service';
import { DoctorModel } from '../../models/doctor.model';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  doctorapp: DoctorModel[] = [];
  cargando = false;

  constructor(private router: Router, private route: ActivatedRoute, private servicioNexosMedical: NexosmedicalService) { }

  ngOnInit(): void {

    this.cargando = true;
    this.listarDoctores();
  }

  listarDoctores() {
    this.servicioNexosMedical.getDoctores()
      .subscribe((response: any) => {

        this.doctorapp = response;
        this.cargando = false;

        // console.log(this.doctorapp);
        console.log('Lista de doctores cargada');
      });
  }

  eliminarDoctorApp(Id: string, i: number) {
    console.log('eliminar registro');
    console.log(Id);

    Swal.fire({
      title: 'Esta seguro?',
      text: `Esta seguro que desea borrar este doctor`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(result => {

      if (result.value) {
        this.doctorapp.splice(i, 1);
        this.servicioNexosMedical.eliminarDoctorApp(Number(Id)).subscribe();
      }
    });
  }

}
