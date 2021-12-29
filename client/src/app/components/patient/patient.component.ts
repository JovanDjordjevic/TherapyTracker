import { Component, Input, OnInit } from '@angular/core';
import { Gender, Menopause, Patient } from 'src/app/models/patient.model';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  @Input() patient: Patient;

  constructor() {
    this.patient = new Patient(
      '',
      '',
      '',
      '',
      0,
      Gender.Female,
      Menopause.Peri,
      '',
      '',
      '',
      '',
      new Date(),
      ''
    );
  }

  ngOnInit(): void {}
}
