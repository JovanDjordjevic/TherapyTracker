import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css'],
})
export class PatientInfoComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    $('.menu .item').tab();
  }
}
