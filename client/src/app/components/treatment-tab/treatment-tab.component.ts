import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-treatment-tab',
  templateUrl: './treatment-tab.component.html',
  styleUrls: ['./treatment-tab.component.css'],
})
export class TreatmentTabComponent implements OnInit {
  showTherapyForm: boolean = false;
  showPatientInfo: boolean = true;

  onShowBiopsyForm() {
    this.showTherapyForm = !this.showTherapyForm;
    this.showPatientInfo = !this.showPatientInfo;
  }

  constructor() {}

  ngOnInit(): void {}
}
