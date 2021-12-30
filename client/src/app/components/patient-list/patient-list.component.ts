import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../../models/patient.model';

declare const $: any;

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnInit {
  @Input() patients: Observable<Patient[]> = {} as Observable<Patient[]>;

  @Output() selectPatient = new EventEmitter<Patient>();

  openHistory(patient: Patient) {
    this.selectPatient.emit(patient);
  }

  constructor() {}

  ngOnInit(): void {
    // $('.sortable.table').tablesort(); implementirati sortiranje kolona
  }
}
