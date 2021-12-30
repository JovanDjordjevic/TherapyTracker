import { Component, OnInit, Input } from '@angular/core';
import { Gender, Menopause, Patient } from 'src/app/models/patient.model';

declare const $: any;

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css'],
})
export class PatientInfoComponent implements OnInit {
  @Input() patient: Patient;

  constructor() {
    this.patient = new Patient(
      'aaa',
      'ghghg',
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

  ngOnInit() {
    console.log(this.patient.name);
    $('.menu .item').tab();
  }
}
