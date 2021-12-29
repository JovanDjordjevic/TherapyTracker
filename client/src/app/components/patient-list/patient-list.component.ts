import { Component, OnInit, Input } from '@angular/core';
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

  constructor() {}

  ngOnInit(): void {
    // $('.sortable.table').tablesort(); implementirati sortiranje kolona
  }
}
