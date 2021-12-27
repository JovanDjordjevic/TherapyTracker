import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tumor-tab',
  templateUrl: './tumor-tab.component.html',
  styleUrls: ['./tumor-tab.component.css'],
})
export class TumorTabComponent implements OnInit {
  showTumorForm: boolean = false;
  showPatientInfo: boolean = true;

  onShowTumorForm() {
    this.showTumorForm = !this.showTumorForm;
    this.showPatientInfo = !this.showPatientInfo;
  }

  constructor() {}

  ngOnInit(): void {}
}
