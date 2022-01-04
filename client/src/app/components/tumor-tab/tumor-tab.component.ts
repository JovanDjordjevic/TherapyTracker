import { Component, Input, OnInit } from '@angular/core';
import { Tumor } from 'src/app/models/tumor.model';

@Component({
  selector: 'app-tumor-tab',
  templateUrl: './tumor-tab.component.html',
  styleUrls: ['./tumor-tab.component.css'],
})
export class TumorTabComponent implements OnInit {
  showTumorForm: boolean = false;
  showPatientInfo: boolean = true;
  @Input() tumors: Tumor[] = [];

  onShowTumorForm() {
    this.showTumorForm = !this.showTumorForm;
    this.showPatientInfo = !this.showPatientInfo;
  }

  constructor() { }

  ngOnInit(): void { }
}
