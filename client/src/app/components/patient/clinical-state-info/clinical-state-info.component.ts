import { Component, Input, OnInit } from '@angular/core';
import { Gender, Menopause, Patient } from 'src/app/models/patient.model';

@Component({
  selector: 'app-clinical-state-info',
  templateUrl: './clinical-state-info.component.html',
  styleUrls: ['./clinical-state-info.component.css']
})
export class ClinicalStateInfoComponent implements OnInit {
  @Input() patient: Patient;
  constructor() {
    this.patient = new Patient('', '', '', '', 0, Gender.Female, Menopause.None, '', '', '', '', new Date, '')
  }

  ngOnInit(): void {
  }

}
