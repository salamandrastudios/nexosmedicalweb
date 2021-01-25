import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import Swal from 'sweetalert2';
import { NexosmedicalService } from '../../services/nexosmedical.service';
import { PacienteModel } from '../../models/paciente.model';

@Component({
  selector: 'app-settingpaciente',
  templateUrl: './settingpaciente.component.html',
  styleUrls: ['./settingpaciente.component.css']
})
export class SettingpacienteComponent implements OnInit {

  formPacienteNexos: FormGroup;
  pacienteapp: PacienteModel = new PacienteModel();

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private servicioNexosMedical: NexosmedicalService) { 
    this.crearFormulario();
    this.cargarData();
  }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {
      this.servicioNexosMedical.getPaciente(Number(id))
        .subscribe((result: any) => {
          console.log(result);

          this.pacienteapp.Id = Number(id);

          this.pacienteapp.NombreCompleto = String(result[0].nombreCompleto);
          this.pacienteapp.NumeroSeguroSocial = Number(result[0].numeroSeguroSocial);
          this.pacienteapp.CodigoPostal = Number(result[0].codigoPostal);
          this.pacienteapp.TelefonoContacto = String(result[0].telefonoContacto);

          this.cargarDataActualizar();
        });
    }
  }

  // #region Validaciones
  get nombreNoValido() {
    return this.formPacienteNexos.get('nombre').invalid && this.formPacienteNexos.get('nombre').touched;
  }

  get seguroSocialNoValido() {
    return this.formPacienteNexos.get('segurosocial').invalid && this.formPacienteNexos.get('segurosocial').touched;
  }

  get codigoPostalNoValido() {
    return this.formPacienteNexos.get('codigopostal').invalid && this.formPacienteNexos.get('codigopostal').touched;
  }

  get telefonoNoValido() {
    return this.formPacienteNexos.get('telefono').invalid && this.formPacienteNexos.get('telefono').touched;
  }
  // #endregion

  crearFormulario() {

    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {

      // Validaciones actualizar paciente
      this.formPacienteNexos = this.fb.group({
        nombre: ['', [Validators.required]],
        segurosocial: ['', [Validators.required]],
        codigopostal: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
      });
    } else {

      // Validaciones usuario paciente
      this.formPacienteNexos = this.fb.group({
        nombre: ['', [Validators.required]],
        segurosocial: ['', [Validators.required]],
        codigopostal: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
      });
    }

  }

  cargarData() {
    this.formPacienteNexos.setValue({
      nombre: '',
      segurosocial: '',
      codigopostal: '',
      telefono: ''
    });
  }

  cargarDataActualizar() {
    this.formPacienteNexos.setValue({
      nombre: this.pacienteapp.NombreCompleto,
      segurosocial: this.pacienteapp.NumeroSeguroSocial,
      codigopostal: this.pacienteapp.CodigoPostal,
      telefono: this.pacienteapp.TelefonoContacto,
    });
  }

  guardar() {
    console.log('Agregar paciente a la DB');

    if (this.formPacienteNexos.invalid) {

      console.log('Formulario no valido');

      return Object.values(this.formPacienteNexos.controls).forEach(control => {

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

    if (this.pacienteapp.Id) {

      this.pacienteapp.NombreCompleto = this.formPacienteNexos.value.nombre;
      this.pacienteapp.NumeroSeguroSocial = this.formPacienteNexos.value.segurosocial;
      this.pacienteapp.CodigoPostal = this.formPacienteNexos.value.codigopostal;
      this.pacienteapp.TelefonoContacto = this.formPacienteNexos.value.telefono;

      // Actualizar paciente app
      this.servicioNexosMedical.actualizarPacienteApp(this.pacienteapp)
        .subscribe(result => {

          Swal.fire({
            title: 'El paciente',
            text: 'se actualizo correctamente',
            icon: 'success'
          });

        });
    }
    else {

      this.pacienteapp.NombreCompleto = this.formPacienteNexos.value.nombre;
      this.pacienteapp.NumeroSeguroSocial = this.formPacienteNexos.value.segurosocial;
      this.pacienteapp.CodigoPostal = this.formPacienteNexos.value.codigopostal;
      this.pacienteapp.TelefonoContacto = this.formPacienteNexos.value.telefono;

      // Agregamos paciente app
      this.servicioNexosMedical.agregarPaciente(this.pacienteapp)
        .subscribe(result => {

          Swal.fire({
            title: 'El paciente',
            text: 'se agrego correctamente',
            icon: 'success'
          });

        });
    }

    // Limpiamos formulario
    this.formPacienteNexos.reset();
    this.router.navigateByUrl('/dashboard');
  }

}
