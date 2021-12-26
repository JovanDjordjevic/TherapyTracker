import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-biopsy-tab',
  templateUrl: './biopsy-tab.component.html',
  styleUrls: ['./biopsy-tab.component.css'],
})
export class BiopsyTabComponent implements OnInit {
  showBiopsyForm: boolean = false;
  showPatientInfo: boolean = true;

  onShowBiopsyForm() {
    this.showBiopsyForm = !this.showBiopsyForm;
    this.showPatientInfo = !this.showPatientInfo;
  }

  constructor() {}

  ngOnInit(): void {}
}
