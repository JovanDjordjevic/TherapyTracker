import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientService } from 'src/app/services/patient-service.service';
import { Patient } from '../../models/patient.model';

declare const $: any;

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnInit {
  @Input() patients: Patient[] = [];

  @Output() selectPatient = new EventEmitter<void>();

  constructor(private patientService: PatientService) {}

  //openHistory(patient: Patient) {
  openHistory(patient: Patient) {
    // u ovom trenutku se postavlja pacijent globalno i ne mora da se radi input/output
    this.patientService.setCurrentPatient(patient);
    // da li ovaj emit mora da ostane (?)
    //this.selectPatient.emit(patient);
    this.selectPatient.emit();
  }

  ngOnInit(): void {
    // $('.sortable.table').tablesort(); implementirati sortiranje kolona
  }
}
