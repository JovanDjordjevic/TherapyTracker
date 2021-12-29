import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  displayPatientForm: boolean = false;

  patients: Observable<Patient[]>;

  constructor(private patientsService: PatientService) {
    this.patients = this.patientsService.getAllPatients(1);
    this.patients.subscribe((data) => console.log(data));
  }

  setShowPatientForm(value: boolean) {
    this.displayPatientForm = value;
  }

  onNewPatient() {
    this.displayPatientForm = true;
  }

  ngOnInit(): void {}
}
