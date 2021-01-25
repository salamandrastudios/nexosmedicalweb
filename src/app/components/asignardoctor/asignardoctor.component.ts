import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import Swal from 'sweetalert2';
import { NexosmedicalService } from '../../services/nexosmedical.service';
import { ListaDoctoresModel } from '../../models/listadoctores.model';
import { AsignarDoctorModel } from '../../models/asignardoctor.model';

@Component({
  selector: 'app-asignardoctor',
  templateUrl: './asignardoctor.component.html',
  styleUrls: ['./asignardoctor.component.css']
})
export class AsignardoctorComponent implements OnInit {

  formAsignar: FormGroup;
  doctores: ListaDoctoresModel[] = [];
  asignardoctor: AsignarDoctorModel = new AsignarDoctorModel();
  cargando = false;
  paciente: number;

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private servicioNexosMedical: NexosmedicalService) {
    this.crearFormulario();
    this.cargarData();
  }

  ngOnInit(): void {
    this.cargando = true;

    const id = this.route.snapshot.paramMap.get('id');
    this.paciente = Number(id);

    this.route.queryParams.subscribe(param => {
      this.listarDoctores();
    });
    this.listarDoctores();
  }

  crearFormulario() {

    this.formAsignar = this.fb.group({
      asignarDoctor: ['', [Validators.required]],
    });

  }

  cargarData() {
    this.formAsignar.setValue({
      asignarDoctor: '',
    });
  }

  listarDoctores() {
    this.servicioNexosMedical.getListaDoctores()
      .subscribe((response: any) => {

        this.doctores = response;
        this.cargando = false;

      });
  }

  guardar() {
    console.log('asignar doctor');

    if (this.formAsignar.invalid) {

      console.log('Formulario no valido');

      return Object.values(this.formAsignar.controls).forEach(control => {

        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }

      });

    }

    Swal.fire({
      title: 'Espere un momento',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.asignardoctor.IdPaciente = this.paciente;
    this.asignardoctor.IdDoctor = this.formAsignar.value.asignarDoctor;

    // Asignamos doctor
    this.servicioNexosMedical.asignarDoctor(this.asignardoctor)
      .subscribe(result => {

        Swal.fire({
          title: 'El doctor',
          text: 'se asigno correctamente',
          icon: 'success'
        });

      });

    // Limpiamos formulario
    this.formAsignar.reset();
    this.router.navigateByUrl('/dashboard');
  }

}
