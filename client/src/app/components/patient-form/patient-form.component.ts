import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css'],
})
export class PatientFormComponent implements OnInit {
  shouldDisplayMenopauseForm: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onFemaleChecked() {
    this.shouldDisplayMenopauseForm = true;
  }

  onMaleChecked() {
    this.shouldDisplayMenopauseForm = false;
  }
}