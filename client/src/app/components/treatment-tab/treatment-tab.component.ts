import { Component, Input, OnInit } from '@angular/core';
import { Therapy } from 'src/app/models/therapy.model';

@Component({
  selector: 'app-treatment-tab',
  templateUrl: './treatment-tab.component.html',
  styleUrls: ['./treatment-tab.component.css'],
})
export class TreatmentTabComponent implements OnInit {
  showTherapyForm: boolean = false;
  showPatientInfo: boolean = true;

  @Input() therapies: Therapy[] = [];

  onShowBiopsyForm() {
    this.showTherapyForm = !this.showTherapyForm;
    this.showPatientInfo = !this.showPatientInfo;
  }

  constructor() { }

  ngOnInit(): void { }
}
