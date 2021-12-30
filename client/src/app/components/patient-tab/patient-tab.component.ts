import { Component, OnInit, Input } from '@angular/core';
import { Gender, Menopause, Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient-service.service';

@Component({
  selector: 'app-patient-tab',
  templateUrl: './patient-tab.component.html',
  styleUrls: ['./patient-tab.component.css'],
})
export class PatientTabComponent implements OnInit {
  //@Input() patient: Patient;
  patient: Patient;

  constructor(private patientService : PatientService) {
    //this.patient = new Patient('a','a','a','a',0,Gender.Female, Menopause.Peri, '',  '', '',  '', new Date(), ''  ); 
    this.patient = this.patientService.getCurrentPatient();
  }
  
  ngOnInit(): void {}
}
