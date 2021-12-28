import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from 'src/app/models/patient.model';
import { Gender, Menopause } from 'src/app/models/patient.model';
import { Output, EventEmitter } from '@angular/core';

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

  constructor(private formBuilder: FormBuilder) {
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
  }

  onFemaleChecked() {
    this.shouldDisplayMenopauseForm = true;
  }

  onMaleChecked() {
    this.shouldDisplayMenopauseForm = false;
  }
}
