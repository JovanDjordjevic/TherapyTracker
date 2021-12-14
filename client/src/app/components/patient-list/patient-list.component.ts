import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // $('.sortable.table').tablesort(); implementirati sortiranje kolona
  }
}
