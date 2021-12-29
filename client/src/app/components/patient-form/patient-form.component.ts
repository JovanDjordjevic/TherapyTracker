import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { Patient } from 'src/app/models/patient.model';
import { Gender, Menopause } from 'src/app/models/patient.model';
import { Output, EventEmitter } from '@angular/core';
import { PatientService } from '../../services/patient-service.service';

declare const $: any;

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css'],
})
export class PatientFormComponent implements OnInit {
  shouldDisplayMenopauseForm: boolean = false;
  patientForm: FormGroup;
  Gender = Gender;
  Menopause = Menopause;
  @Output() onDisplayPatientForm = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService
  ) {
    this.patientForm = this.formBuilder.group({
      jmbg: ['', [Validators.required]],
      name: ['', [Validators.required]],
      parentName: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      yearOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      menopause: ['', [Validators.required]],
      address: ['', []],
      city: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      email: ['', []],
      tumorDateDiagnosis: ['', [Validators.required]],
      familyAnamnesis: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onPatientFormSubmit() {
    //console.log(this.patientForm);
    this.onDisplayPatientForm.emit(false);
    const data = this.patientForm.value;

    const newPatient = new Patient(
      data.jmbg,
      data.name,
      data.parentName,
      data.surname,
      data.yearOfBirth,
      data.gender,
      data.menopause,
      data.address,
      data.city,
      data.contact,
      data.email,
      data.tumorDateDiagnosis,
      data.familyAnamnesis
    );

    if (data.gender == Gender.Male) newPatient.menopause = Menopause.None;

    this.patientService.insertPatientInDB(newPatient);

    console.log(newPatient);
    this.patientService
      .getAllPatients(1)
      .subscribe((data) => console.log(data));
  }

  onFemaleChecked() {
    this.shouldDisplayMenopauseForm = true;
  }

  onMaleChecked() {
    this.shouldDisplayMenopauseForm = false;
  }

  nameHasErrors(): boolean {
    const errors: ValidationErrors | undefined | null =
      this.patientForm.get('name')?.errors;
    return errors !== null;
  }
}
