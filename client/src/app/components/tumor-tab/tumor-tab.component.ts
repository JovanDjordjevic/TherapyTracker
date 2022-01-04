import { Component, Input, OnInit } from '@angular/core';
import { Gradus, HER2_FISH_SICH, Tumor } from 'src/app/models/tumor.model';

@Component({
  selector: 'app-tumor-tab',
  templateUrl: './tumor-tab.component.html',
  styleUrls: ['./tumor-tab.component.css'],
})
export class TumorTabComponent implements OnInit {
  showTumorForm: boolean = false;
  showPatientInfo: boolean = true;
  @Input() tumors: Tumor[] = [];
  tumor: Tumor;

  onShowTumorForm() {
    this.showTumorForm = !this.showTumorForm;
    this.showPatientInfo = !this.showPatientInfo;
  }

  onTumorSelected(value: any) {
    this.tumor = value;
    this.showTumorForm = false;
  }

  constructor() {
    this.tumor = new Tumor(new Date(), "", "", Gradus.Type1, 0, 0, 0, 0, 0, 0, 0, 0, HER2_FISH_SICH.Negative, 0, "", 0);
  }

  ngOnInit(): void { }
}
