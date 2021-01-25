import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import Swal from 'sweetalert2';
import { NexosmedicalService } from '../../services/nexosmedical.service';
import { DoctorModel } from '../../models/doctor.model';


@Component({
  selector: 'app-settingdoctor',
  templateUrl: './settingdoctor.component.html',
  styleUrls: ['./settingdoctor.component.css']
})
export class SettingdoctorComponent implements OnInit {

  formDoctorNexos: FormGroup;
  doctorapp: DoctorModel = new DoctorModel();
  idDoctor: string;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private servicioNexosMedical: NexosmedicalService) {
    this.crearFormulario();
    this.cargarData();
   }

  ngOnInit(): void {


  }

  // #region Validaciones
  get nombreNoValido() {
    return this.formDoctorNexos.get('nombre').invalid && this.formDoctorNexos.get('nombre').touched;
  }

  get especialidadNoValida() {
    return this.formDoctorNexos.get('especialidad').invalid && this.formDoctorNexos.get('especialidad').touched;
  }

  get credencialNoValida() {
    return this.formDoctorNexos.get('credencial').invalid && this.formDoctorNexos.get('credencial').touched;
  }

  get hospitalNoValido() {
    return this.formDoctorNexos.get('hospital').invalid && this.formDoctorNexos.get('hospital').touched;
  }
  // #endregion

  crearFormulario() {

    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {

      // Validaciones actualizar doctor
      this.formDoctorNexos = this.fb.group({
        nombre: ['', [Validators.required]],
        especialidad: ['', [Validators.required]],
        credencial: ['', [Validators.required]],
        hospital: ['', [Validators.required]],
      });
    } else {

      // Validaciones usuario doctor
      this.formDoctorNexos = this.fb.group({
        nombre: ['', [Validators.required]],
        especialidad: ['', [Validators.required]],
        credencial: ['', [Validators.required]],
        hospital: ['', [Validators.required]],
      });
    }

  }

  cargarData() {
    this.formDoctorNexos.setValue({
      nombre: '',
      especialidad: '',
      credencial: '',
      hospital: ''
    });
  }

  cargarDataActualizar() {
    this.formDoctorNexos.setValue({
      nombre: this.doctorapp.NombreCompleto,
      especialidad: this.doctorapp.Especialidad,
      credencial: this.doctorapp.NumeroCredencial,
      hospital: this.doctorapp.HospitalDondeTrabaja,
    });
  }

  guardar() { 
    console.log('Agregar doctor a la DB');

    if (this.formDoctorNexos.invalid) {

      console.log('Formulario no valido');

      return Object.values(this.formDoctorNexos.controls).forEach(control => {

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

    this.doctorapp.NombreCompleto = this.formDoctorNexos.value.nombre;
    this.doctorapp.Especialidad = this.formDoctorNexos.value.especialidad;
    this.doctorapp.NumeroCredencial = this.formDoctorNexos.value.credencial;
    this.doctorapp.HospitalDondeTrabaja = this.formDoctorNexos.value.hospital;

    // Agregamos doctor
    this.servicioNexosMedical.agregarDoctor(this.doctorapp)
      .subscribe(result => {

        console.log(result);

        Swal.fire({
          title: 'El doctor',
          text: 'se agrego correctamente',
          icon: 'success'
        });

      });
    
    // Limpiamos formulario
    this.formDoctorNexos.reset();
    this.router.navigateByUrl('/dashboard');
  }



}
