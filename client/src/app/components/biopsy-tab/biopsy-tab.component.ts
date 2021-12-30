import { Component, Input, OnInit } from '@angular/core';
import { Patient, Gender, Menopause } from 'src/app/models/patient.model';
import { Biopsy } from 'src/app/models/biopsy.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-biopsy-tab',
  templateUrl: './biopsy-tab.component.html',
  styleUrls: ['./biopsy-tab.component.css'],
})
export class BiopsyTabComponent implements OnInit {
  showBiopsyForm: boolean = false;
  showPatientInfo: boolean = true;

  @Input() patient: Patient;
  @Input() biopsies: Observable<Biopsy[]> = {} as Observable<Biopsy[]>;

  onShowBiopsyForm() {
    this.showBiopsyForm = !this.showBiopsyForm;
    this.showPatientInfo = !this.showPatientInfo;
  }

  constructor() {
    this.patient = new Patient(
      'aaa',
      '',
      '',
      '',
      0,
      Gender.Female,
      Menopause.None,
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
