import { Component, OnInit, Input } from '@angular/core';
import { Gender, Menopause, Patient } from 'src/app/models/patient.model';

@Component({
  selector: 'app-patient-tab',
  templateUrl: './patient-tab.component.html',
  styleUrls: ['./patient-tab.component.css'],
})
export class PatientTabComponent implements OnInit {
  @Input() patient: Patient;

  constructor() {
    this.patient = new Patient(
      'aaa',
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
