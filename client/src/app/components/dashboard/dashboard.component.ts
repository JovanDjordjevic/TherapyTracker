import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Gender, Menopause, Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  displayPatientForm: boolean = false;
  displayPatientHistory: boolean = false;
  displayPatientList: boolean = true;

  patients: Observable<Patient[]> = {} as Observable<Patient[]>;
  patient: Patient;
  private sub: Subscription;

  constructor(private patientsService: PatientService) {
    this.sub = this.patientsService.getAllPatients(1).subscribe();
    //this.patients = this.patientsService.getAllPatients(1);
    this.patient = new Patient(
      'a',
      'a',
      'a',
      'a',
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
    //this.patients.subscribe((data) => console.log(data));
  }

  setShowPatientForm() {
    this.displayPatientForm = false;
    this.displayPatientHistory = false;
    this.displayPatientList = true;
  }

  openHistory(patient: Patient) {
    this.patient = patient;
    this.displayPatientHistory = true;
    this.displayPatientForm = false;
    this.displayPatientList = false;
  }

  onNewPatient() {
    this.displayPatientForm = true;
    this.displayPatientList = false;
    this.displayPatientHistory = false;
  }

  ngOnInit(): void {}
}
