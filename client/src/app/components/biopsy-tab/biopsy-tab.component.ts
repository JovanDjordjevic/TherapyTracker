import { Component, Input, OnInit } from '@angular/core';
import { Patient, Gender, Menopause } from 'src/app/models/patient.model';
import { Biopsy } from 'src/app/models/biopsy.model';
import { Observable } from 'rxjs';
import { PatientService } from 'src/app/services/patient-service.service';

@Component({
  selector: 'app-biopsy-tab',
  templateUrl: './biopsy-tab.component.html',
  styleUrls: ['./biopsy-tab.component.css'],
})
export class BiopsyTabComponent implements OnInit {
  showBiopsyForm: boolean = false;
  showPatientInfo: boolean = true;

  //@Input() patient: Patient;
  patient : Patient;
  @Input() biopsies: Biopsy[] = [];

  onShowBiopsyForm() {
    this.showBiopsyForm = !this.showBiopsyForm;
    this.showPatientInfo = !this.showPatientInfo;
  }

  constructor(private patientService : PatientService) {
    //this.patient = new Patient('a','a','a','a',0,Gender.Female, Menopause.Peri, '',  '', '',  '', new Date(), ''  ); 
    this.patient = this.patientService.getCurrentPatient();
  }

  ngOnInit(): void {}
}
