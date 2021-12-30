import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Gender, Menopause, Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  displayPatientForm: boolean = false;
  displayPatientHistory: boolean = false;
  displayPatientList: boolean = true;

  patients:Patient[] = [];

  patient: Patient;
  sub: Subscription = new Subscription();

  constructor(private patientsService: PatientService) {
    this.sub = this.patientsService.getAllPatients(1).subscribe((patients: Patient[]) => {
      this.patients = patients;
      //console.log("dashboard constructor, getAll zahtev: ", this.patients);    // radi dobro
    });
    this.patient = new Patient('a','a','a','a',0,Gender.Female, Menopause.Peri, '',  '', '',  '', new Date(), ''  );    
    // todo: proveri da li ovo moze da bude fix za ovu iniciajlizaciju:
    // https://stackoverflow.com/questions/49699067/property-has-no-initializer-and-is-not-definitely-assigned-in-the-construc
  }

  setShowPatientForm() {
    this.displayPatientForm = false;
    this.displayPatientHistory = false;
    this.displayPatientList = true;
  }

  //openHistory(patient: Patient) {
    //this.patient = patient;
openHistory() {
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

  ngOnDestroy(): void {
      this.sub.unsubscribe()
  }
}
